<template>
  <div>
    <p>{{node.name}}</p>
  </div>
</template>

<script>
export default {
  computed: {
    node() {
      var cacheNode = this.$store.getters.getSelectedNode;
      if (cacheNode) return cacheNode;
      return {};
    }
  }
};
</script>
