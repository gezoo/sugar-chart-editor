<template>
  <div ref="ChartCanvas">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
import ChartWapper from "./ChartWapper.vue";
import ChartText from "./Other/ChartText.vue";
import ChartImage from "./Other/ChartImage.vue";
import ChartTimer from "./Other/ChartTimer.vue";
import ChartContainer from "./ChartContainer.vue";
export default {
  methods: {
    createNode(type) {
      var chlid;
      if (type == "text") {
        chlid = ChartText;
      } else if (type == "image") {
        chlid = ChartImage;
      } else {
        chlid = ChartTimer;
      }

      return chlid;
    },
    createComponent(parent, chlid, node) {
      const component = new Vue({
        parent: parent,
        render(h) {
          return h(
            ChartContainer,
            {
              props: {
                attribute: {
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  width: `${node.width}px`,
                  height: `${node.height}px`
                }
              },
              on: {}
            },
            [h(chlid)]
          );
        }
      });
      return component;
    }
  },
  mounted() {
    var json = localStorage.getItem("editor");
    if (json == "" || json == null) return;
    var data = JSON.parse(json);
    var nodes = data.nodes;
    var self = this;
    nodes.forEach((node, index, array) => {
      var chlid = this.createNode(node.type);
      var component = createComponent(self, chlid, node);
      this.$refs.ChartCanvas.appendChild(component.$mount().$el);
    });
  }
};
</script>