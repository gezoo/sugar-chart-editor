<template>
  <div>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default{
  props:{
    text:{
      type:String,
      default:'23412342134'
    }
  },
  watch: {
    text(value){
      console.log(value);
    }
  },
}
</script>