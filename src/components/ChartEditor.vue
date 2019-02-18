<template>
  <div @dragenter="ondragenter" @dragover="ondragover" @drop="ondrop" ref="ChartEditor"></div>
</template>

<script>
import Vue from "vue";
import ChartWapper from "./ChartWapper.vue";

export default {
  components: {
    ChartWapper
  },
  methods: {
    ondragenter(event) {},
    ondragover(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    ondrop(event) {
      var eleId = event.dataTransfer.getData("text");
      const instance = new Vue({
        render(h) {
          return h(ChartWapper, {
            props: {
              selected: true,
              position: { x: event.offsetX, y: event.offsetY }
            }
          });
        }
      });
      var component = instance.$mount();
      this.$refs.ChartEditor.appendChild(component.$el);
    }
  }
};
</script>
