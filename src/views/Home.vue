<template>
  <el-container style="position: absolute;top:0;bottom:0;left: 0;right: 0;">
    <el-header style="height: 48px;background:#3a3f51; display: flex;justify-content:center ;align-items:center">
      <div style>
        <li class="el-icon-zoom-out" @click="onZoomOut"></li>
      </div>
      <div class="button-item">
        <el-dropdown  @command="onchange">
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
          <el-tab-pane label="组件库" name="second" class="chart-samples-items">
            <el-collapse value="1" style="height:100%">
              <el-collapse-item title="其他组件" name="1">
                <div draggable="true" ref="chartText" data-chart-type="text" @dragstart="ondragstart">
                  <el-button icon="el-icon-picture">文本</el-button>
                </div>
                <div draggable="true" ref="chartImage" data-chart-type="image" @dragstart="ondragstart">
                  <el-button icon="el-icon-picture">图片</el-button>
                </div>
                <div draggable="true" data-chart-type="timer" ref="chartTimer" @dragstart="ondragstart">
                  <el-button icon="el-icon-picture">时间</el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container>
        <el-header style="height:40px; display: flex;justify-content:center ;align-items:center">
          <el-card :body-style="{ padding: '5px 20px' } ">
            <div @click="onClickTitle">{{title}}</div>
          </el-card>
        </el-header>
        <el-main style="padding:15px;">
          <ChartEditor style="transform-origin: 0% 0%;" :style="{'transform':ChartEditorStyle}" />
        </el-main>
        <!-- <el-footer style="height:30px">
          <span class="demonstration">默认</span>
          <el-slider value=100 height="10" input-size="mini"></el-slider>
        </el-footer> -->
      </el-container>
      <el-aside width="300px">
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
    computed: {
      title(){
        var root = this.$store.getters.getEditorRoot;
        return root.name;
      }
    },
    methods: {
      ondragstart(event) {
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData(
          "text/plan",
          `${event.target.dataset.chartType},${guid()}`
        );
      },
      onchange(value) {
        this.ChartEditorScale = parseInt(value);
        this.ChartEditorStyle = `scale(${this.ChartEditorScale / 100},${this.ChartEditorScale / 100})`;
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
      onZoomIn() {
        this.ChartEditorScale += 1;
        this.ChartEditorStyle = `scale(${this.ChartEditorScale / 100},${this.ChartEditorScale / 100})`;
      },
      onZoomOut(){
        this.ChartEditorScale -= 1;
        this.ChartEditorStyle = `scale(${this.ChartEditorScale / 100},${this.ChartEditorScale / 100})`;
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

  .chart-samples-items>div {
    height: 24px;
    border: 1px solid gray;
  }

  .el-dropdown-link {

    cursor: pointer;
  }
</style>