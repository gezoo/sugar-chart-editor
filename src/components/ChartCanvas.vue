<template>
  <div style="position: absolute;top:0;bottom:0;left: 0;right: 0;">
    <div ref="ChartCanvas" style="transform-origin: 0% 0%;">
    </div>
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
                  left: `${node.x}px`,
                  top: `${node.y}px`,
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
    var nodes = data.cacheNodes;

    var self = this;
    nodes.forEach((node, index, array) => {
      var chlid = this.createNode(node.type);
      var component = this.createComponent(self, chlid, node);
      this.$refs.ChartCanvas.appendChild(component.$mount().$el);
    });

    this.$nextTick(() => {
      self.$refs.ChartCanvas.style.width = `${data.width}px`;
      self.$refs.ChartCanvas.style.height = `${data.height}px`;
      self.$refs.ChartCanvas.style.background = `url(${data.background}) no-repeat 100% 100%`;
      var zoomIn = window.outerHeight / data.height;
      self.$refs.ChartCanvas.style.transform = `scale(${zoomIn},${zoomIn})`;
    });
  }
};
</script>