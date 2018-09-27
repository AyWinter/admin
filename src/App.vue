<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .container{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left:0px;
    width: 100%;
    height:100%;
  }
</style>
