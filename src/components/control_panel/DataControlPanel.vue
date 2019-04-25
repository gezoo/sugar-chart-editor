<template>
  <div style="padding:0 15px">
    <el-row v-for="(item, index) in attrs" :key="index" style="padding:5px 0">
      <el-col :span="8" style="line-height:40px">
        {{item.description}}
      </el-col>
      <el-col :span="16">
        <component v-bind:is="item.cmp"></component>
        <el-row v-if="item.config && item.options">
          <div>
            <!-- {{getOption(item.attrValue.value, item.config, item.options).description}} -->
          </div>
          <component v-bind:is="getOption(item.attrValue.value, item.config, item.options).cmp"></component>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import base from './BaseControlPanel'
  export default {
    panelType: 'DATA',
    mixins: [base],
  };
</script>

<style scoped>
  .control-title {
    line-height: 40px;
  }
</style>