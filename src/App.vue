<template>
  <div id="app">
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