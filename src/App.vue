<template>
  <div id="app">
    <el-container style="height: 700px">
      <el-header style="height: 60px;background:#3a3f51">
        <el-row>
          <ElCol :span="8"></ElCol>
          <ElCol :span="8">
            <div></div>
          </ElCol>
          <ElCol :span="4">
            <div></div>
          </ElCol>
          <ElCol :span="2">
            <!-- <el-button type="primary" icon="el-icon-edit"></el-button> -->
          </ElCol>
          <ElCol :span="2">
            <!-- <el-button type="primary" icon="el-icon-delete"></el-button> -->
            <el-button type="primary" @click="onPreview">浏览<i class="el-icon-upload el-icon--right"></i></el-button>
          </ElCol>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style>
          <el-tabs value="second" type="card">
            <el-tab-pane label="图层管理" name="first"></el-tab-pane>
            <el-tab-pane label="图表库" name="second" class="chart-samples-items">
              <el-card draggable="true" ref="chartText" data-chart-type="text" @dragstart="ondragstart">
                文本
              </el-card>
              <div draggable="true" ref="chartImage" data-chart-type="image" @dragstart="ondragstart">图片</div>
              <div draggable="true">折线图</div>
              <div draggable="true" ref="chartTimer" data-chart-type="timer" @dragstart="ondragstart">时间</div>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-container>
          <el-main style="position: relative;">
            <ChartEditor style="transform-origin:0% 0%;background: url(/assets/background-1.png)" :style="{'transform':ChartEditorStyle}" />
          </el-main>
          <el-footer>
            <el-slider v-model="ChartEditorScale" @change="onchange"></el-slider>
          </el-footer>
        </el-container>
        <el-aside width="200px"></el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ChartEditor from "./components/ChartEditor.vue";
  import guid from './utils/random_str.js';


  export default {
    name: "app",
    components: {
      ChartEditor
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
        event.dataTransfer.setData("text/plan", `${event.target.dataset.chartType},${guid()}`);
      },
      onchange(value) {
        this.ChartEditorStyle = `scale(${value / 100},${value / 100})`;
      },
      onPreview(event){

        var nodes = this.$store.getters.getEditorRoot.nodes;
        nodes.forEach(node => {
          console.log(node);
        });
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

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0px;
    background: #f0f3f4;
  }

  .chart-samples-items>div {
    height: 24px;
    border: 1px solid gray;
  }
</style>