<template>
  <div id="ChartEditor" @dragenter="ondragenter" @dragover="ondragover" @drop="ondrop" ref="ChartEditor"
    :style="chartEditorSize"></div>
</template>

<script>
  import Vue from "vue";
  import ChartWapper from "./ChartWapper.vue";
  import ChartText from "./Other/ChartText.vue";
  import ChartImage from "./Other/ChartImage.vue";

  export default {
    name: "ChartEditor",
    components: {
      ChartWapper
    },
    data() {
      return {
        chartEditorSize: {
          width: "1920px",
          height: "1080px"
        },
        nodes: []
      };
    },
    methods: {
      ondragenter(event) { },
      ondragover(event) {
        event.preventDefault();
      },
      ondrop(event) {
        event.preventDefault();
        var text = event.dataTransfer.getData("text/plan");
        if (text == "") return;
        var arr = text.split(',');
        var eleId = arr[1];
        var hasNode = false;
        this.nodes.forEach(node => {
          if (eleId == node.id) {
            hasNode = true;
          }
        });
        if (hasNode) return;
        var chlid;
        if (arr[0] == "text") {
          chlid = ChartText;
        } else {
          chlid = ChartImage;
        }
        const instance = new Vue({
          render(h) {
            return h(
              ChartWapper,
              {
                props: {
                  id: eleId,
                  selected: true,
                  position: { x: event.offsetX, y: event.offsetY }
                }
              },
              [h(chlid)]
            );
          }
        });
        var component = instance.$mount();
        this.$refs.ChartEditor.appendChild(component.$el);
        this.nodes.push({
          id: eleId,
          type: "text",
          component: component
        });
      }
    }
  };
</script>