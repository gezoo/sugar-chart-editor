<template>
  <div class="chart-wapper" :class="{'chart-wapper-border': isHover, 'chart-wapper-opacity': isSelect }" @dragstart="ondragstart"
    @dragend="ondragend" @mouseover="onMouseOver" @mouseout="onMouseOut" @click="onSelected" ref="chartWapper"
    draggable="true">
    <div v-show="isSelect" class="chart-wapper-editor-tooltip">
      <el-tooltip effect="dark" content="删除" placement="top-start">
        <div class="chart-wapper-editor-delete" @click="onDelete">x</div>
      </el-tooltip>
      <el-tooltip effect="dark" content="复制图表" placement="top-start">
        <div class="chart-wapper-editor-copy">▣</div>
      </el-tooltip>
    </div>

    <div v-show="isSelect" class="chart-wapper-editor-right chart-wapper-background-color" @mousedown="onMouseDown"></div>
    <div v-show="isSelect" class="chart-wapper-editor-bottom chart-wapper-background-color" @mousedown="onMouseDown"></div>
    <div v-show="isSelect" class="chart-wapper-editor-rb chart-wapper-background-color" @mousedown="onMouseDown"></div>
    <div class="chart-wapper-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      selected: {
        type: Boolean,
        default: true
      },
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
        isSelect: this.selected
      };
    },
    computed: {
      parent() {
        if (this.$el.parentElement.id == "ChartEditor") {
          return this.$el.parentElement;
        } else {
          throw Error("invaild ChartEditor component");
        }
      }
    },
    wacth: {
      selected(value) {
        this.isHover = value;
        this.isSelect = value;
        this.$refs.chartWapper.draggable = value;
      }
    },
    methods: {
      ondragstart(event) {
        event.dataTransfer.dropEffect = "move";
        this.mouseInterval.x = event.offsetX - this.$refs.chartWapper.offsetLeft;
        this.mouseInterval.y = event.offsetY - this.$refs.chartWapper.offsetTop;
      },
      ondragend(event) {
        this.moveTo(
          this.$refs.chartWapper,
          { x: event.offsetX, y: event.offsetY },
          this.mouseInterval
        );
      },
      moveTo(target, mousePosition, targetInverval) {
        if (mousePosition.x - targetInverval.x >= 0) {
          target.style.left = `${mousePosition.x - targetInverval.x}px`;
        } else {
          target.style.left = "0px";
        }
        if (mousePosition.y - targetInverval.y >= 0) {
          target.style.top = `${mousePosition.y - targetInverval.y}px`;
        } else {
          target.style.top = "0px";
        }
      },
      resizeWidth(mouseX, eleOffsetX) {
        this.$refs.chartWapper.style.width = `${mouseX - eleOffsetX}px`;
      },
      resizeHeight(mouseY, eleOffsetY) {
        this.$refs.chartWapper.style.height = `${mouseY - eleOffsetY}px`;
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
              that.resizeWidth(mouseEvent.clientX , eleRect.x);
            } else if (resizeBy("chart-wapper-editor-bottom")) {
              that.resizeHeight(mouseEvent.clientY, eleRect.y);
            } else if (resizeBy("chart-wapper-editor-rb")) {
              that.resizeWidth(mouseEvent.clientX, eleRect.x);
              that.resizeHeight(mouseEvent.clientY, eleRect.y);
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
        this.isHover = true;
        this.isSelect = true;
        this.$refs.chartWapper.draggable = true;
        this.$emit("selected", [event]);
      },
      onDelete() {
        this.$emit('delete', this.id);
      },
      onCopy() {
        this.$emit('copy', this.id);
      },
      removeMouseMoveEvent() {
        var that = this;
        document.onmouseup = function () {
          if (that.isSelect) that.$refs.chartWapper.draggable = true;
          that.parent.onmousemove = null;
        };
      }
    },
    mounted() {
      this.removeMouseMoveEvent();
      this.$refs.chartWapper.style.left = `${this.position.x}px`;
      this.$refs.chartWapper.style.top = `${this.position.y}px`;
    },
    created() { }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chart-wapper {
    position: absolute;
  }

  .chart-wapper-border {
    border: 2px solid #09f;
  }

  .chart-wapper-background-color {
    background: #09f;
  }

  .chart-wapper-opacity {
    /* opacity: 0.5 */
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
</style>