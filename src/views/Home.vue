<template>
  <el-container style="position: absolute;top:0;bottom:0;left: 0;right: 0;">
    <el-header
      style="height: 48px;background:#3a3f51; display: flex;justify-content:center ;align-items:center"
    >
      <div class="button-item" style>
        <li class="el-icon-zoom-out"></li>
        <li class="el-icon-zoom-in"></li>
      </div>
      <div class="button-item">
        <i class="el-icon-edit"></i>
      </div>
      <div class="button-item">
        <i class="el-icon-upload" @click="onView"></i>
      </div>
    </el-header>
    <el-container style="height: 100%;">
      <el-aside width="200px" style>
        <el-tabs value="second" type="card">
          <el-tab-pane label="图层管理" name="first">
            <LayerPanel></LayerPanel>
          </el-tab-pane>
          <el-tab-pane label="图表库" name="second" class="chart-samples-items">
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="其他组件" name="1">
                <div
                  draggable="true"
                  ref="chartText"
                  data-chart-type="text"
                  @dragstart="ondragstart"
                >
                  <el-button icon="el-icon-picture">文本</el-button>
                </div>
                <div
                  draggable="true"
                  ref="chartImage"
                  data-chart-type="image"
                  @dragstart="ondragstart"
                >
                  <el-button icon="el-icon-picture">图片</el-button>
                </div>
                <div
                  draggable="true"
                  data-chart-type="timer"
                  ref="chartTimer"
                  @dragstart="ondragstart"
                >
                  <el-button icon="el-icon-picture">时间</el-button>
                </div>
              </el-collapse-item>
            </el-collapse>

            <!-- <div
                  draggable="true"
                  ref="chartText"
                  data-chart-type="text"
                  @dragstart="ondragstart" 
                >文本</div>
                <div
                  draggable="true"
                  ref="chartImage"
                  data-chart-type="image"
                  @dragstart="ondragstart" 
                >图片</div>
                <div
                  draggable="true"
                  data-chart-type="timer"
                  ref="chartTimer"
                  @dragstart="ondragstart" 
            >时间</div>-->
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container>
        <el-header style="height:40px; display: flex;justify-content:center ;align-items:center">
          <el-card :body-style="{ padding: '5px 20px' } ">
            <div @click="onClickTitle">大屏1</div>
          </el-card>
        </el-header>
        <el-main style="padding:15px;">
          <ChartEditor style="transform-origin: 0% 0%;" :style="{'transform':ChartEditorStyle}"/>
        </el-main>
      </el-container>
      <el-aside width="200px">
        <el-tabs>
          <ElTabPane label="属性">
            <ControlPanel></ControlPanel>
          </ElTabPane>
          <ElTabPane label="高级"></ElTabPane>
        </el-tabs>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import ChartEditor from "../components/ChartEditor.vue";
import LayerPanel from "../components/LayerPanel.vue";
import ControlPanel from "../components/ControlPanel.vue";
import guid from "../utils/random_str.js";

export default {
  components: {
    ChartEditor,
    LayerPanel,
    ControlPanel
  },
  data() {
    return {
      ChartEditorScale: 100,
      ChartEditorStyle: "scale(1,1)"
    };
  },
  computed: {},
  methods: {
    ondragstart(event) {
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData(
        "text/plan",
        `${event.target.dataset.chartType},${guid()}`
      );
    },
    onchange(value) {
      this.ChartEditorStyle = `scale(${value / 100},${value / 100})`;
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
      window.open(href, "_blank", "toolbar=yes, fullscreen=yes");
    },
    deepClone(data) {
      if (!data || !(data instanceof Object) || typeof data == "function") {
        return data || undefined;
      }
      var constructor = data.constructor;
      var result = new constructor();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          result[key] = deepClone(data[key]);
        }
      }
      return result;
    }
  },
  mounted() {
    // this.$refs.chartText.ondragstart = function (event) {
    //   event.dataTransfer.effectAllowed = "copy";
    //   event.dataTransfer.setData("text/plan", event.target.dataset.chartType);
    // }
  }
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
/* body {
    margin: 0px;
    background: #f0f3f4;
  } */

.chart-samples-items > div {
  height: 24px;
  border: 1px solid gray;
}
</style>