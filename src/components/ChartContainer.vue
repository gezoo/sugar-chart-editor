<template>
  <div :style="attribute" style="position: absolute;" ref="ChartContainer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      styleObj: {}
    };
  },
  mounted() {
  },
  created() {
    console.log(this.attribute);
  }
};
</script>