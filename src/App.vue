<template>
  <div id="app">
    <router-view/>
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

.chart-samples-items > div {
  height: 24px;
  border: 1px solid gray;
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