<template>
  <div class="chart-wapper" :class="{'chart-wapper-border': isHover,'chart-wapper-noborder':!isHover }"
    @mouseover="onMouseOver" @mouseout="onMouseOut" @click.stop="onSelected" ref="chartWapper" draggable="false"
    v-if="open">
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

    <div v-show="isHover" style="position:absolute; left:0;right:0;top:0;bottom:0" class="chart-wapper-opacity"
      @mousedown="onCmpMousedown" ref="wapperOpacity">
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
        selected: false,
        isDown: false
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
      ...mapGetters(['getNodes', 'getSelectedId']),
    },
    wacth: {
    },
    methods: {
      onCmpMousedown(event) {
        console.log("onCmpMousedown")
        if (!this.isSelect) return;
        //获取x坐标和y坐标
        let x = event.clientX;
        let y = event.clientY;

        //获取左部和顶部的偏移量
        let l = this.$refs.chartWapper.offsetLeft;
        let t = this.$refs.chartWapper.offsetTop;
        this.isDown = true;
        //设置样式  
        event.target.style.cursor = 'move';
        var that = this;
        this.parent.onmousemove = function (e) {
          if (!that.isDown) return;
          //获取x和y
          var nx = e.clientX;
          var ny = e.clientY;
          //计算移动后的左偏移量和顶部的偏移量
          var left = nx - (x - l);
          var top = ny - (y - t);

          that.$emit("onchanged", { id: that.id, x: left, y: top });

        }
      },
      onMouseDown(event) {
        if (event.button != 0) return; //不是鼠标左键单击
        var that = this;
        this.isDown = false;
        var ele = this.$refs.chartWapper;
        this.parent.onmousemove = function (mouseEvent) {
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
          that.parent.onmousemove = null;
          that.$refs.wapperOpacity.style.cursor = 'Default';
          that.isDown = false;
        };
      },
      changeSelectStatus(state) {
        this.isSelect = state;
      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   this.removeMouseMoveEvent();
      // });
      this.removeMouseMoveEvent();
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
    display: flex;
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

  .chart-wapper-container {
    flex: 1;
  }
</style>