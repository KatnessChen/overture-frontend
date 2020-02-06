<template>
  <h1 class="logo__wrapper">
    <router-link tag="span" to="/index">
      <h1 class="logo-main">OVERTURE</h1>
    </router-link>
    <p class="logo-slogan">Murmurs about web and life.</p>
  </h1>
</template>

<script>
export default {
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>

.logo__wrapper {
  z-index: 3;
  position: relative;
  .logo-main {
    font-family: 'Inria Serif', serif;
    font-size: 48px;
    color: gold;
    text-shadow: 2.5px 2.5px darkred;
    cursor: pointer;
  }
  .logo-slogan {
    padding-left: 6px;
    color: goldenrod;
    text-shadow: 2.5px 2.5px brown;
  }
}
</style>
