<template>
  <el-container>
    <el-aside width="200px">
      <DashboardNavMenu />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>

export default {
  data: () => ({
  }),
  mounted() {
  },
};
</script>

<style lang="scss" scoped>

.el-container {
  height: 100vh;
  display: flex;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  overflow: hidden;
  padding: 24px 24px 0 24px;
  .el-row {
    height: 100%;
  }
}
.el-menu {
  height: 100%;
}
</style>
