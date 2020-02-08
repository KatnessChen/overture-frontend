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
@import '@/assets/scss/components/logo.scss';

</style>
