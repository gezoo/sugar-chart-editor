<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <el-container>
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
    </el-container> -->
    <router-view />
  </div>
</template>

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