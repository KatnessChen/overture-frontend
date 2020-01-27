<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, 'Microsoft JhengHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #112233;
  min-height: 100vh;
  @include scrollbars;
  &::-webkit-scrollbar {
    width: 11px;
  }
  &::-webkit-scrollbar-track {
    background: $scrollbarBG;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $thumbBG;
    border-radius: 6px;
    border: 3px solid $scrollbarBG;
  }
}

</style>
