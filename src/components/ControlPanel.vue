<template>
  <div style="padding:20px">
    <el-row v-for="(item, index) in attrs" :key="index">
      <el-col :span="8" style="line-height:40px">
        {{item.name}}
      </el-col>
      <el-col :span="16">
        <component v-bind:is="item.cmp"></component>
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
        cacheAtts: new Map() //属性组件缓存
      };
    },
    computed: {
      id() {
        return this.$store.getters.getSelectedId;
      },
      nodes() {
        return this.$store.getters.getNodes;
      }
    },
    watch: {
      nodes(value) {
        if (this.cacheAtts.has(this.id)) {
          var node = value.find(x => x.id == this.id);

          //从store中获取值更新至缓存
          var tempAtts = this.cacheAtts.get(this.id);
          tempAtts.forEach(attr => {
            var val = node[attr.cmpType];
            attr.attrValue.value = val;
          });

          this.attrs = tempAtts;
        } else {

        }
      },
      id(value) {

        if (this.cacheAtts.has(this.id)) {
          this.attrs = this.cacheAtts.get(this.id);
          return;
        }

        var tempAtts = []
        var node = this.nodes.find(x => x.id == this.id);
        if (node) {
          var config = this.$config[node.type];
          var baseConfig = this.$config['base'];
          var mergeConfig = Object.assign({}, baseConfig, config);

          if (config) {
            Object.keys(mergeConfig).forEach(x => {
              var item = mergeConfig[x];
              if (item && Object.keys(item).length != 0) {
                var attrValue = Object.assign({}, item.props, { value: node[x] || '' });
                var cmp = this.createComponent(item, x, attrValue)
                tempAtts.push({ cmpType: x, key: guid(), name: item.desc, cmp, attrValue })
              }

            });
            this.attrs = tempAtts;
            this.cacheAtts.set(this.id, tempAtts);
          }
        } else {
          var root = this.$store.getters.getEditorRoot;
          if (this.id == root.id) {
            var editorConfig = this.$config['editor'];
            Object.keys(editorConfig).forEach(x => {
              var item = editorConfig[x];
              var attrValue = Object.assign({}, item.props, { value: root[x] || '' });
              var cmp = this.createComponent(item, x, attrValue)
              tempAtts.push({ cmpType: x, key: guid(), name: item.desc, cmp, attrValue });

            });
            this.attrs = tempAtts;
            this.cacheAtts.set(this.id, tempAtts);
          }
        }
      }
    },
    methods: {
      createComponent(config, attrName, node) {
        var self = this;
        var cmp = Vue.extend({
          parent: self,
          render(h) {
            return h(config.type, {
              props: node,
              on: self.rebuildEvents(config.events, config.props, attrName)
            })
          },
        });

        return cmp;
      },
      rebuildEvents(events, props, attrName) {
        var self = this;
        var newEvents = {};
        if (!events) return newEvents;
        Object.keys(events).forEach(key => {
          newEvents[key] = self.AOP(events[key],
            (args) => {
              self.beforeClick(self.id, attrName, args);
            },
            (args) => self.afterClick(self.id, attrName, args),
          )
        });
        return newEvents;
      },
      AOP(originFun, before, after) { // 添加属性组件执行事件装饰
        function wapper() {
          before.apply(this, arguments);
          originFun.apply(this, arguments);
          after.apply(this, arguments);
        }
        return wapper;
      },
      beforeClick(args) {

      },
      afterClick(id, attr, val) {
        console.log('after' + val);
        var props = { id: id };
        props[attr] = val;
        this.$store.commit('changeNode', props); //默认更新
      }
    },
  };
</script>

<style scoped>
  .position {}
</style>