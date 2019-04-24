<template>
  <div style="position: absolute;top:0;bottom:0;left: 0;right: 0;">
    <div ref="ChartCanvas" style="transform-origin: 0% 0%;">
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import ChartWapper from "./ChartWapper.vue";
  import ChartContainer from "./ChartContainer.vue";
  export default {
    methods: {
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
              [h(chlid, { props: node })]
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
        var chlid = this.$userComponent(node.type);
        var component = this.createComponent(self, chlid, node);
        this.$refs.ChartCanvas.appendChild(component.$mount().$el);
      });

      this.$nextTick(() => {
        self.$refs.ChartCanvas.style.width = `${data.width}px`;
        self.$refs.ChartCanvas.style.height = `${data.height}px`;
        self.$refs.ChartCanvas.style.background = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(data.background) ? data.background : `url(${data.background}) no-repeat 100% 100%`;
        var zoomIn = (window.innerHeight ) / data.height;
        self.$refs.ChartCanvas.style.transform = `scale(${zoomIn})`;

        var margin = window.innerWidth - (data.width * zoomIn);
        if (margin > 0) {
          self.$refs.ChartCanvas.style.margin = `0 ${margin / 2}px`
        }

        window.onresize = function () {
          console.log(window.innerHeight + 'px');
          var zoomIn = (window.innerHeight ) / data.height;
          self.$refs.ChartCanvas.style.transform = `scale(${zoomIn})`;
          var margin = window.innerWidth - (data.width * zoomIn);
          if (margin > 0) {
            self.$refs.ChartCanvas.style.margin = `0 ${margin / 2}px`
          }else{
            self.$refs.ChartCanvas.style.margin = 0;
          }
        }
      });
    }
  };
</script>