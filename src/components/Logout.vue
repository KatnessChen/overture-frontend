<template>
  <i @click="onSignOut" class="link el-icon-switch-button">
    登出
  </i>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    onSignOut() {
      this.$store.dispatch('auth/signout').then(() => {
        if (this.$route.path !== '/index') {
          this.$router.push({ path: '/index' });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/logout.scss';

</style>
