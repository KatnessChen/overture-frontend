<template>
  <div id="app">
    <keep-alive>
      <transition name="fade">
        <router-view />
      </transition>
    </keep-alive>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
