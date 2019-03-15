<template>
  <div style="padding:20px">
    <el-row v-for="(item, index) in attrs" :key="index">
      <el-col :span="8">
        {{item.value.desc}}
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
        attrs: []
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
        var node = value.find(x => x.id == this.id);
        if (node) {
          this.attrs = [];
          Object.keys(node).forEach(key => {
            var item = node[key];
            this.attrs.push({ key: key, value: item });
          });
        }
      },
      id(value) {
        this.attrs = [];
        // var root = this.$store.getters.getEditorRoot;
        // if (this.id == root.id) {
        //   Object.keys(root).forEach(key => {
        //     if (key !== "nodes" && key !== "cacheNodes") {
        //       this.attrs.push({ key: key, value: root[key] });
        //     }
        //   });
        //   return;
        // }
        var tempAtts = []
        var node = this.nodes.find(x => x.id == this.id);
        if (node) {
          var config = this.$config[node.type];

          if (config) {
            Object.keys(config).forEach(x => {
              var item = config[x];
              var cmp = this.createComponent(item)
              tempAtts.push({ key: guid(), value: item, cmp })
            })
            this.attrs = tempAtts;
          }
        }
      }
    },
    methods: {
      createComponent(config) {
        var cmp = Vue.extend({
          render(h) {
            return h(config.type, {
              props: config.props,
              on: config.events
            })
          },
        });

        return cmp;
      }
    },
  };
</script>