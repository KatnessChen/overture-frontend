<template>
  <div class="index__warpper">
    <BlogpostNavMenu />
    <landingContent />
  </div>
</template>

<script>
import landingContent from '@/page/blogpost/LandingContent.vue';

export default {
  components: { landingContent },
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/view-index.scss';

</style>
