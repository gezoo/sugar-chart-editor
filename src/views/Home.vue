<template>
  <el-container style="position: absolute;top:0;bottom:0;left: 0;right: 0;">
    <el-header
      style="height: 48px;background:#3a3f51; display: flex;justify-content:center ;align-items:center"
    >
      <div style>
        <li class="el-icon-zoom-out" @click="onZoomOut"></li>
      </div>
      <div class="button-item">
        <el-dropdown @command="onchange">
          <span class="el-dropdown-link">{{ChartEditorScale+'%'}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="10">10%</el-dropdown-item>
            <el-dropdown-item command="25">25%</el-dropdown-item>
            <el-dropdown-item command="50">50%</el-dropdown-item>
            <el-dropdown-item command="75">75%</el-dropdown-item>
            <el-dropdown-item command="100">100%</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <li class="el-icon-zoom-in" @click="onZoomIn"></li>
      </div>
      <div class="button-item">
        <i class="el-icon-edit"></i>
      </div>
      <div class="button-item">
        <i class="el-icon-upload" @click="onView"></i>
      </div>
    </el-header>
    <el-container style="height: 100%;">
      <el-aside width="200px" ref="left">
        <el-tabs value="second" type="card">
          <el-tab-pane label="图层管理" name="first">
            <LayerPanel></LayerPanel>
          </el-tab-pane>
          <el-tab-pane label="组件库" name="second" class="chart-samples-items">
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="图表组件" name="1">
                <DragControl chart-path="text">折线图</DragControl>
                <DragControl chart-path="text">柱状图</DragControl>
                <DragControl chart-path="text">饼图</DragControl>
              </el-collapse-item>
            </el-collapse>
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="指标组件" name="1">
                <DragControl chart-path="text">进度条</DragControl>
                <DragControl chart-path="text">环形进度条</DragControl>
                <DragControl chart-path="text">指标</DragControl>
              </el-collapse-item>
            </el-collapse>
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="地图组件" name="1">
                <DragControl chart-path="text">地图</DragControl>
              </el-collapse-item>
            </el-collapse>
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="表格组件" name="1">
                <DragControl chart-path="text">表格</DragControl>
                <DragControl chart-path="text">表格轮播</DragControl>
              </el-collapse-item>
            </el-collapse>
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="图片组件" name="1">
                <DragControl chart-path="text">图片轮播</DragControl>
                <DragControl chart-path="text">图片</DragControl>
                <DragControl chart-path="text">iframe</DragControl>
              </el-collapse-item>
            </el-collapse>
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="文本组件" name="1">
                <DragControl chart-path="text">文本</DragControl>
                <DragControl chart-path="text">文本跑马灯</DragControl>
                <DragControl chart-path="text">超链接</DragControl>
                <DragControl chart-path="text">时间</DragControl>
              </el-collapse-item>
            </el-collapse>
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="素材组件" name="1">
                <DragControl chart-path="text">边框</DragControl>
                <DragControl chart-path="text">图片</DragControl>
                <DragControl chart-path="text">图标</DragControl>
                <DragControl chart-path="text">线</DragControl>
                <DragControl chart-path="text">图形</DragControl>
              </el-collapse-item>
            </el-collapse>
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="测试组件" name="1">
                <DragControl chart-path="label/ChartText">文本</DragControl>
                <DragControl chart-path="image/ChartImage">图片</DragControl>
                <DragControl chart-path="timer/ChartTimer">时间</DragControl>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <div class="resizer" @onmousedown="onmousedown" @onmouseup="onmouseup" data-resizer="left"></div>
      <el-container>
        <el-header style="height:40px; display: flex;justify-content:center ;align-items:center">
          <el-card :body-style="{ padding: '5px 20px' } ">
            <div @click="onClickTitle">{{title}}</div>
          </el-card>
        </el-header>
        <el-main style="padding:15px;">
          <ChartEditor style="transform-origin: 0 0;" :style="{'transform':ChartEditorStyle}"/>
        </el-main>
        <!-- <el-footer style="height:30px">
          <span class="demonstration">默认</span>
          <el-slider value=100 height="10" input-size="mini"></el-slider>
        </el-footer>-->
      </el-container>
      <div class="resizer" @onmousedown="onmousedown" @onmouseup="onmouseup" data-resizer="right"></div>
      <el-aside width="300px" ref="right">
        <el-tabs>
          <ElTabPane label="属性">
            <ControlPanel></ControlPanel>
          </ElTabPane>
          <ElTabPane label="高级">
            <DATAControlPanel></DATAControlPanel>
          </ElTabPane>
        </el-tabs>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import ChartEditor from "../components/ChartEditor.vue";
import LayerPanel from "../components/LayerPanel.vue";
import ControlPanel from "../components/control_panel/ControlPanel.vue";
import DATAControlPanel from "../components/control_panel/DataControlPanel.vue";
import DragControl from "../components/Drag.vue";
import guid from "../utils/random_str.js";

export default {
  components: {
    ChartEditor,
    LayerPanel,
    ControlPanel,
    DATAControlPanel,
    DragControl
  },
  data() {
    return {
      ChartEditorScale: 100,
      ChartEditorStyle: "scale(1,1)"
    };
  },
  computed: {
    title() {
      var root = this.$store.getters.getEditorRoot;
      return root.name;
    }
  },
  methods: {
    onchange(value) {
      this.ChartEditorScale = parseInt(value);
      this.ChartEditorStyle = `scale(${this.ChartEditorScale / 100},${this
        .ChartEditorScale / 100})`;
    },
    onClickTitle() {
      var root = this.$store.getters.getEditorRoot;
      this.$store.commit("setSelectedId", root.id);
    },
    onView() {
      var root = this.$store.getters.getEditorRoot;
      var newRoot = Object.assign({}, root);
      var json = JSON.stringify(newRoot);
      localStorage.setItem("editor", json);
      const { href } = this.$router.resolve({
        name: "share",
        props: { id: root.id }
      });
      window.open(href, "_blank", "toolbar=yes");
    },
    onZoomIn() {
      if (this.ChartEditorScale <= 1000) {
        this.ChartEditorScale += 1;
        this.ChartEditorStyle = `scale(${this.ChartEditorScale / 100},${this
          .ChartEditorScale / 100})`;
      }
    },
    onZoomOut() {
      if (this.ChartEditorScale > 10) {
        this.ChartEditorScale -= 1;
        this.ChartEditorStyle = `scale(${this.ChartEditorScale / 100},${this
          .ChartEditorScale / 100})`;
      }
    },
    onmousedown(event) {
      console.log(event);

      window.onmouseover = function(e) {
        if (event.target.dataset.resizer == "left") {
          this.$refs.left.style.width = e.clientX + "px";
        } else if (event.target.dataset.resizer == "right") {
          //this.$refs.right.style.width =
        }
      };
    },
    onmouseup(event) {
      window.onmouseover = null;
    }
  },
  mounted() {}
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[class*=" el-icon-"],
[class^="el-icon-"] {
  font-size: 24px;
}

.button-item {
  margin: 0 10px;
}

.chart-samples-items > div {
  height: 24px;
  border: 1px solid gray;
}

.el-dropdown-link {
  cursor: pointer;
}

.resizer {
  width: 5px;
  background: #c5c5c5;
  z-index: 0;
  cursor: col-resize;
}
::-webkit-scrollbar {
  width: 0.75rem;
  height: 0.75rem;
  padding: 0 0.125rem;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 6px;
  border: 3px solid transparent;
  background-clip: content-box;
  background-color: #A8A8A8;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
</style>