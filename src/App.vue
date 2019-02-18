<template>
  <div id="app">
    <el-container style="height: 500px">
      <el-header style="height: 80px;background:#3a3f51">
        <el-row>
          <ElCol :span="8">大屏设计器</ElCol>
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
          </ElCol>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style>
          <el-tabs value="second" type="card">
            <el-tab-pane label="图层管理" name="first"></el-tab-pane>
            <el-tab-pane label="图表库" name="second" class="chart-samples-items">
              <div draggable="true" ref="chartText">文本</div>
              <div draggable="true">柱状图</div>
              <div draggable="true">折线图</div>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-main>
          <div style="position:static; height:100%; width:100%">
            <ChartEditor style="height: 500px ; width: 500px"/>
            <ChartWapper selected="true"></ChartWapper>
          </div>
        </el-main>
        <el-aside width="200px">Aside</el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ChartWapper from "./components/ChartWapper.vue";
import ChartEditor from "./components/ChartEditor.vue";

export default {
  name: "app",
  components: {
    ChartWapper,
    ChartEditor
  },
  mounted(){
    this.$refs.chartText.ondragstart = function (event) {
      event.dataTransfer.setData("text/plain", event.target.id);
    }
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
}

.chart-samples-items > div {
  height: 24px;
  border: 1px solid gray;
}
</style>
