<template>
  <div class="chart-wapper" :class="{'chart-wapper-border': isHover,'chart-wapper-noborder':!isHover }"
    @dragstart="ondragstart" @dragend="ondragend" @mouseover="onMouseOver" @mouseout="onMouseOut"
    @click.stop="onSelected" ref="chartWapper" draggable="true" v-if="open">
    <div v-show="isSelect" class="chart-wapper-editor-tooltip">
      <el-tooltip effect="dark" content="删除" placement="top-start">
        <div class="chart-wapper-editor-delete" @click.stop="onDelete">x</div>
      </el-tooltip>
      <el-tooltip effect="dark" content="复制图表" placement="top-start">
        <div class="chart-wapper-editor-copy">▣</div>
      </el-tooltip>
    </div>

    <div class="grid-line" v-show="isSelect">
      <div class="grid-line-top"></div>
      <div class="grid-line-left"></div>
      <div class="grid-line-label" style="font-size: 20px;">
        {{wapperStyle.x}},{{wapperStyle.y}}
      </div>
    </div>

    <div v-show="isHover" style="position:absolute; left:0;right:0;top:0;bottom:0" class="chart-wapper-opacity">
    </div>

    <div v-show="isSelect" class="chart-wapper-editor-right chart-wapper-background-color" @mousedown="onMouseDown">
    </div>
    <div v-show="isSelect" class="chart-wapper-editor-bottom chart-wapper-background-color" @mousedown="onMouseDown">
    </div>
    <div v-show="isSelect" class="chart-wapper-editor-rb chart-wapper-background-color" @mousedown="onMouseDown"></div>
    <div class="chart-wapper-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  export default {
    props: {
      id: String,
      position: {
        type: Object,
        default: { x: 0, y: 0 }
      }
    },
    data() {
      return {
        mouseInterval: {
          x: 0,
          y: 0
        },
        isHover: true,
        open: true,
        selected: false
      };
    },
    computed: {
      parent() {
        if (this.$el.parentElement.id == "ChartEditor") {
          return this.$el.parentElement;
        } else {
          throw Error("invaild ChartEditor component");
        }
      },
      isSelect() {
        var selected = this.$store.getters.getSelectedId == this.id;
        this.isHover = selected;
        this.$nextTick(() => {
          this.$refs.chartWapper.draggable = selected;
        });
        return selected;
      },
      wapperStyle() {
        var nodes = this.$store.getters.getNodes;
        var node = nodes.find(x => x.id == this.id);

        this.$nextTick(() => {
          this.$refs.chartWapper.style.width = `${node.width}px`;
          this.$refs.chartWapper.style.height = `${node.height}px`;
          this.$refs.chartWapper.style.left = `${node.x}px`;
          this.$refs.chartWapper.style.top = `${node.y}px`;
        });
        return node;
      },
      ...mapGetters(['getNodes','getSelectedId']),
    },
    wacth: {
    },
    methods: {
      ondragstart(event) {
        event.dataTransfer.dropEffect = "move";
        this.mouseInterval.x = event.offsetX - this.$refs.chartWapper.offsetLeft;
        this.mouseInterval.y = event.offsetY - this.$refs.chartWapper.offsetTop;
      },
      ondragend(event) {
        if (!this.isSelect) return; //没选中不移动组件
        this.moveTo(
          this.$refs.chartWapper,
          { x: event.offsetX, y: event.offsetY },
          this.mouseInterval
        );
      },
      moveTo(target, mousePosition, targetInverval) {
        var left = 0;
        var top = 0;
        if (mousePosition.x - targetInverval.x >= 0) {
          left = mousePosition.x - targetInverval.x;
        }
        if (mousePosition.y - targetInverval.y >= 0) {
          top = mousePosition.y - targetInverval.y;
        }
        this.$emit("onchanged", { id: this.id, x: left, y: top });
      },
      onMouseDown(event) {
        if (event.button != 0) return; //不是鼠标左键单击
        var that = this;
        var ele = this.$refs.chartWapper;
        ele.draggable = false;
        this.parent.onmousemove = function (mouseEvent) {
          if (ele.draggable) return;
          var resizeBy = className => {
            return event.target.className.indexOf(className) != -1;
          };
          if (event.target) {
            var eleRect = ele.getBoundingClientRect();
            if (resizeBy("chart-wapper-editor-right")) {
              that.$emit("onchanged", { id: that.id, width: mouseEvent.clientX - eleRect.x });
            } else if (resizeBy("chart-wapper-editor-bottom")) {
              that.$emit("onchanged", { id: that.id, height: mouseEvent.clientY - eleRect.y });
            } else if (resizeBy("chart-wapper-editor-rb")) {
              that.$emit("onchanged", { id: that.id, width: mouseEvent.clientX - eleRect.x, height: mouseEvent.clientY - eleRect.y });
            } else {
            }
          }
        };
      },

      onMouseOver(event) {
        if (this.isSelect == false) {
          this.isHover = true;
        }
      },
      onMouseOut(event) {
        if (this.isSelect == false) {
          this.isHover = false;
        }
      },
      onSelected(event) {
        this.$emit("onselected", this.id);
      },
      onDelete(event) {
        event.stopPropagation();
        this.open = false;
        this.$emit("delete", this.id);
      },
      onCopy(event) {
        event.stopPropagation();
        this.$emit("copy", this.id);
      },
      removeMouseMoveEvent() {
        var that = this;
        document.onmouseup = function () {
          if (that.isSelect) that.$refs.chartWapper.draggable = true;
          that.parent.onmousemove = null;
        };
      },
      changeSelectStatus(state) {
        this.isSelect = state;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.removeMouseMoveEvent();
        // this.$refs.chartWapper.style.left = `${this.position.x}px`;
        // this.$refs.chartWapper.style.top = `${this.position.y}px`;
        // this.$store.commit("changeNode", {
        //   id: this.id,
        //   height: this.$refs.chartWapper.clientHeight,
        //   width: this.$refs.chartWapper.clientWidth,
        //   x: this.position.x,
        //   y: this.position.y
        // });
        // this.$store.commit("setSelectedId", this.id);
      });

      if (this.isSelect) {
        this.$emit("onselected", this.id);
      }
    },
    created() { },
    beforeDestroy() { }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .chart-wapper {
    position: absolute;
  }

  .chart-wapper-border {
    border: 2px solid #09f;
    z-index: 9999;
  }

  .chart-wapper-noborder {
    border: 2px solid #fff0;
    z-index: 9999;
  }

  .chart-wapper-background-color {
    background: #09f;
  }

  .chart-wapper-opacity {
    opacity: 0.1;
    background: #09f;
    user-select: none;
  }

  .chart-wapper-editor-right {
    position: absolute;
    width: 6px;
    height: 8px;
    right: -6px;
    top: calc(50% - 4px);
    cursor: w-resize;
  }

  .chart-wapper-editor-bottom {
    position: absolute;
    width: 8px;
    height: 6px;
    bottom: -6px;
    left: calc(50% - 4px);
    cursor: n-resize;
  }

  .chart-wapper-editor-rb {
    position: absolute;
    width: 6px;
    height: 6px;
    bottom: -5px;
    right: -5px;
    cursor: nw-resize;
  }

  .chart-wapper-editor-tooltip {
    position: absolute;
    width: 36px;
    height: 12px;
    top: 0px;
    left: 0px;
    background: #09f;
    color: #fff;
    font-size: 3px;
    display: flex;
    justify-content: space-around;
  }

  .grid-line-top {
    position: absolute;
    border-left: 1px dashed #09f;
    width: 0;
    height: 2160px;
    left: 0;
    transform: translateY(-100%);
  }

  .grid-line-left {
    position: absolute;
    border-top: 1px dashed #09f;
    width: 3840px;
    height: 0;
    top: 0;
    transform: translateX(-100%);
  }

  .grid-line-label {
    position: absolute;
    padding: 5px;
    transform: translate(-100%, -100%);
    color: #09f;
    white-space: nowrap;
  }
</style>