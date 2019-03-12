<template>
  <div
    id="ChartEditor"
    @dragenter="ondragenter"
    @dragover="ondragover"
    @drop="ondrop"
    ref="ChartEditor"
    :style="backgroundStyle"
    style="box-shadow: 0 0 10px 0 rgba(0,0,0,.5); overflow: hidden; "
    @click="onEditorClick"
  >
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
      return {
        width: `${root.width}px`,
        height: `${root.height}px`,
        background: `url(${root.background}) no-repeat 100% 100%`
      };
    }
  },
  methods: {
    onEditorClick(event) {
      this.$store.commit("setSelectedId", "");
    },
    ondragenter(event) {},
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

      var chlid = this.$userComponent(eventData.type);
      var component = this.createComponent(
        eventData.eleId,
        { x: event.offsetX, y: event.offsetY },
        chlid
      );
      this.$store.commit("addNode", {
        id: eventData.eleId,
        type: eventData.type,
        x: event.offsetX,
        y: event.offsetY
      });
    },
    nodeClick(id) {
      this.$store.commit("setSelectedId", id);
    },
    deleteNode(id) {
      this.$store.commit("deleteNode", id);
    },
    copyNode(id) {},
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
                copy: that.copyNode
              }
            },
            [h(chlid)]
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
  mounted() {}
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
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 2px,
      transparent 0px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 2px, transparent 0px);
}
</style>
