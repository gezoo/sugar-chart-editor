<template>
  <div style="padding:0 15px">
    <el-row v-for="(item, index) in attrs" :key="index" style="padding:5px 0">
      <el-col :span="8" style="line-height:40px">
        {{item.description}}
      </el-col>
      <el-col :span="16">
        <component v-bind:is="item.cmp"></component>
        <el-row v-if="item.config && item.options">
          <div>
            <!-- {{getOption(item.attrValue.value, item.config, item.options).description}} -->
          </div>
          <component v-bind:is="getOption(item.attrValue.value, item.config, item.options).cmp"></component>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import guid from "../utils/random_str.js";
  export default {
    data() {
      return {
        attrs: [],
        cacheAttrs: new Map() //属性组件缓存
      };
    },
    computed: {
      id() {
        return this.$store.getters.getSelectedId;
      },
      nodes() {
        return this.$store.getters.getNodes;
      },
      root() {
        return this.$store.getters.getEditorRoot;
      }
    },
    watch: {
      root(value) {
        if (value.id == this.id && this.cacheAttrs.has(this.id)) {
          this.updateAttValue(value);
        }
      },
      nodes(value) {
        var node = value.find(x => x.id == this.id);
        if (node && this.cacheAttrs.has(this.id)) {
          //从store中获取值更新至缓存
          this.updateAttValue(node);
        }
      },
      id(value) {
        if (this.cacheAttrs.has(this.id)) { //缓存中包含则取之更新
          this.attrs = this.cacheAttrs.get(this.id);
          return;
        }

        //创建组件
        var createCmp = function (config, store) {
          let tempAtts = []
          Object.keys(config).forEach(attrName => {
            var item = config[attrName];
            if (item && Object.keys(item).length != 0) {
              //包含子选项则以设置的默认值为准
              var attrValue = Object.assign({}, item.props, item.options ? { value: item.defaultValue } : { value: store[attrName] || '' }); //指定 value 默认值
              var cmp = this.createComponent(item, attrName, attrValue);

              if (item.options) {
                var optionCmps = item.options.map(option => {
                  var tmp = {};
                  tmp[attrName] = option;
                  return tmp;
                }).map(option => {
                  return createCmp.apply(this, [option, store]);
                }).map(x => x[0]);

                tempAtts.push({ attrName, description: item.desc, cmp, attrValue, options: optionCmps, config: item });
              } else {
                tempAtts.push({ attrName, description: item.desc, cmp, attrValue, config: item });
              }
            }
          });
          return tempAtts;
        }

        var node = this.nodes.find(x => x.id == this.id);
        if (node) {
          var config = this.$config[node.type];
          var baseConfig = this.$config['base'];
          var mergeConfig = Object.assign({}, baseConfig, config); //合并基础属性和配置属性

          if (config) {
            this.attrs = createCmp.apply(this, [mergeConfig, node]);
            this.cacheAttrs.set(this.id, this.attrs);
          }
        } else {
          var root = this.$store.getters.getEditorRoot;
          if (this.id == root.id) {
            var editorConfig = this.$config['editor']; //编辑器属性
            this.attrs = createCmp.apply(this, [editorConfig, root]);
            this.cacheAttrs.set(this.id, this.attrs);
          }
        }
      }
    },
    methods: {
      updateAttValue(store) {
        var tempAttrs = this.cacheAttrs.get(this.id);
        tempAttrs.forEach(attr => {
          if (attr.options) {
            var option = this.getOption(attr.attrValue.value, attr.config, attr.options);
            option.attrValue.value = store[attr.attrName];
          } else {
            attr.attrValue.value = store[attr.attrName];
          }
        });
        this.attrs = tempAttrs;
      },
      getOption(value, config, options) {
        var item = config.slots.find(x => x.key == value);
        return options[item.option];
      },
      createComponent(config, attrName, node) {
        var self = this;
        var cmp = Vue.extend({
          parent: self,
          render(h) {
            var child = config.slots ? config.slots.map(item => {
              return h(item.type, { props: item.props, on: item.events })
            }) : []; //包含子组件
            var options = {
              props: node,
              on: self.rebuildEvents(config, attrName),
            };
            var isHtmlDom = typeof (config.type) == 'string';
            if (isHtmlDom) {
              Object.keys(node).forEach(key => {
                if (key != 'value') {
                  options[key] = node[key];
                }
              })
            }
            return h(config.type, options, isHtmlDom ? node.value : child)
          },
        });

        return cmp;
      },
      rebuildEvents(config, attrName) {
        var self = this;
        var newEvents = {};
        if (!config || !config.events) return newEvents;
        Object.keys(config.events).forEach(key => {
          newEvents[key] = self.wapper(
            config.events[key],
            (args) => self.beforeClick(self.id, attrName, args, config),
            (args) => self.afterClick(self.id, attrName, args, config),
          )
        });

        return newEvents;
      },
      wapper(originFun, before, after) { // 添加属性组件执行事件装饰
        function _apply() {
          before.apply(this, arguments);
          originFun.apply(this, arguments);
          after.apply(this, arguments);
        }
        return _apply;
      },
      beforeClick(id, attr, val, config) {
      },
      afterClick(id, attr, val, config) {
        if (config.options && config.options.length != 0) {
          var tempAttrs = this.cacheAttrs.get(this.id);
          tempAttrs.forEach(x => {
            if (x.attrName == attr) {
              x.attrValue.value = val;
            }
          })
        } else {
          console.log(attr + ':' + val);
          var props = { id: id };
          props[attr] = val;
          this.$store.commit('changeNode', props); //默认更新
        }
      }
    },
  };
</script>

<style scoped>
  .control-title {
    line-height: 40px;
  }
</style>