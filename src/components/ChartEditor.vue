<template>
  <div id="ChartEditor" @dragenter="ondragenter" @dragover="ondragover" @drop="ondrop" ref="ChartEditor"
    :style="backgroundStyle" style="box-shadow: 0 0 10px 0 rgba(0,0,0,.5); overflow: hidden; " @click="onEditorClick">
    <div id="dashboard-grid-overlay" class="can-cancel-chart-target" style></div>
  </div>
</template>

<script>
  import Vue from "vue";
  import ChartWapper from "./ChartWapper.vue";
  import { mapState, mapGetters, mapActions } from "vuex";

  export default {
    name: "ChartEditor",
    components: {
      ChartWapper
    },
    props: {
      editorAttrite: {
        type: Object,
        default: undefined
      },
      isEdit: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chartEditorSize: {
          width: "1920px",
          height: "1080px"
        }
      };
    },
    computed: {
      backgroundStyle() {
        var root = this.$store.getters.getEditorRoot;

        //判断颜色代码 例如#fffff
        return {
          width: `${root.width}px`,
          height: `${root.height}px`,
          background: /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(root.background) ? root.background : `url(${root.background}) no-repeat 100% 100%`,
        };
      },
      nodes() {
        return this.$store.getters.getNodes;
      }
    },
    methods: {
      onEditorClick(event) {
        var root = this.$store.getters.getEditorRoot;
        this.$store.commit("setSelectedId", root.id);
      },
      ondragenter(event) { },
      ondragover(event) {
        event.preventDefault();
      },
      ondrop(event) {
        event.preventDefault();
        var eventData = this.getElementData(event);
        if (eventData == undefined) return;
        this.$store.commit("setSelectedId", eventData.eleId);
        var hasNode = this.$store.getters.hasNodeById(eventData.eleId);
        if (hasNode) return;
        var newNode = {
          id: eventData.eleId,
          type: eventData.type,
          x: event.offsetX,
          y: event.offsetY
        };
        var atts = this.$config[eventData.type];
        Object.keys(atts).forEach(key => {
          if (key.indexOf("style.") != -1) {
            var styleKey = key.split('.')[1];
            if (newNode.style) {
              newNode.style[styleKey] = atts[key].defaultValue;
            } else {
              newNode.style = {};
              newNode.style[styleKey] = atts[key].defaultValue;
            }
          }

          newNode[key] = atts[key].defaultValue;
        });

        this.$store.commit("addNode", newNode);
        var position = this.$store.getters.getNodeById(eventData.eleId);
        var chlid = this.$userComponent(eventData.type);
        var component = this.createComponent(
          eventData.eleId,
          position,
          chlid
        );
      },
      nodeClick(id) {
        this.$store.commit("setSelectedId", id);
      },
      deleteNode(id) {
        this.$store.commit("deleteNode", id);
      },
      copyNode(id) { },
      nodeChanged(attrs) {
        this.$store.commit("changeNode", attrs);
      },
      createComponent(eleId, position, chlid) {
        var that = this;
        const component = new Vue({
          parent: this,
          render(h) {
            return h(
              ChartWapper,
              {
                props: {
                  id: eleId,
                  position: position
                },
                on: {
                  onselected: that.nodeClick,
                  delete: that.deleteNode,
                  copy: that.copyNode,
                  onchanged: that.nodeChanged
                }
              },
              [h(chlid, { props: position, style: position.style })]
            );
          }
        });
        this.$refs.ChartEditor.appendChild(component.$mount().$el);
        return component;
      },
      getElementData(event) {
        var text = event.dataTransfer.getData("text/plan");
        if (text == "") return;
        var arr = text.split(",");

        return {
          type: arr[0],
          eleId: arr[1]
        };
      }
    },
    mounted() { }
  };
</script>

<style>
  #dashboard-grid-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: 25px 25px, 25px 25px;
    background-image: linear-gradient(rgba(255, 255, 255, 0.1) 2px,
      transparent 0px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 2px, transparent 0px);
  }
</style>