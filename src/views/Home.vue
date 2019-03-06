<template>
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
          <el-button type="primary" icon="el-icon-edit"></el-button>
        </ElCol>
        <ElCol :span="2">
          <el-button type="primary" icon="el-icon-delete" @click="onView"></el-button>
        </ElCol>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style>
        <el-tabs value="second" type="card">
          <el-tab-pane label="图层管理" name="first"></el-tab-pane>
          <el-tab-pane label="图表库" name="second" class="chart-samples-items">
            <div draggable="true" ref="chartText" data-chart-type="text" @dragstart="ondragstart">文本</div>
            <div draggable="true" ref="chartImage" data-chart-type="image" @dragstart="ondragstart">图片</div>
            <div draggable="true">折线图</div>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container>
        <el-main>
          <ChartEditor style="background: #fff;transform-origin: 0% 0%;" :style="{'transform':ChartEditorStyle}" />
        </el-main>
        <el-footer>
          <el-slider v-model="ChartEditorScale" @change="onchange"></el-slider>
        </el-footer>
      </el-container>
      <el-aside width="200px"></el-aside>
    </el-container>
  </el-container>
</template>

<script>
  import ChartEditor from "../components/ChartEditor.vue";
  import guid from '../utils/random_str.js';

  export default {
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
      onView() {
        var root = this.$store.getters.getEditorRoot;
        var newNodes = [];
        root.nodes.forEach(node => {
          newNodes.push(node);
        });
        var cache = [];
        var newRoot = Object.assign({}, root);
        newRoot.nodes = newNodes;
        var json = JSON.stringify(newRoot);
        localStorage.setItem('editor',json);
        const { href } = this.$router.resolve({
          name: 'editor',
          props: {isEdit: false}
        })
        window.open(href, '_blank', 'toolbar=yes, width=1300, height=900');
      },
      deepClone(data) {
        if (!data || !(data instanceof Object) || (typeof data == "function")) {
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

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* body {
    margin: 0px;
    background: #f0f3f4;
  } */

  .chart-samples-items>div {
    height: 24px;
    border: 1px solid gray;
  }
</style>