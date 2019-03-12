<template>
  <div style="padding:20px">
    <p v-for="(item, index) in attrs" :key="index">{{item.key}}:{{item.value}}</p>
  </div>
</template>

<script>
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
      var root = this.$store.getters.getEditorRoot;
      if (this.id == root.id) {
        Object.keys(root).forEach(key => {
          if (key !== "nodes" && key !== "cacheNodes") {
            this.attrs.push({ key: key, value: root[key] });
          }
        });
        return;
      }

      var node = this.nodes.find(x => x.id == this.id);
      if (node) {
        Object.keys(node).forEach(key => {
          var item = node[key];
          this.attrs.push({ key: key, value: item });
        });
      }
    }
  }
};
</script>
