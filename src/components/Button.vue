<template>
  <el-button
    @click="$emit('click')"
    :type="type"
    :size="size"
  >{{ label }}
  </el-button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '確認',
    },
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'mini',
    },
  },
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>

</style>
