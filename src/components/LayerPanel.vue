<template>
  <div>
    <ul>
      <li v-for="node in getNodes" :key="node.id" @click="onclick(node)">
        <div :class="{'chart-wapper-border': node.id == selectedId}">{{node.name}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  export default {
    computed: {
      ...mapGetters(['getNodes']),
      ...mapState({
        selectedId: state => state.editor.selectedId
      })
    },
    watch: {
    },
    methods: {
      onclick(node) {
        this.$store.commit("setSelectedId", node.id);
      }
    }
  };
</script>

<style scoped>
  .chart-wapper-border {
    border: 2px solid #09f;
  }
</style>