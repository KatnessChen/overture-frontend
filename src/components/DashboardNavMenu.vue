<template>
  <el-menu
    default-active="1"
    background-color="#112233"
    text-color="#fff"
    active-text-color="#ffd04b">
    <div class="user__info">
      <label class="label"></label>
      <span class="user__email">{{ currenentUserEmail }}</span>
    </div>
    <el-menu-item index="1" @click.native="clickMenu('article')">
      <i class="el-icon-menu"></i>
      <span slot="title">文章總覽</span>
    </el-menu-item>
    <el-menu-item index="2" @click.native="clickMenu('comment')">
      <i class="el-icon-document"></i>
      <span slot="title">留言</span>
    </el-menu-item>
    <el-menu-item index="3" @click.native="clickMenu('category')">
      <i class="el-icon-setting"></i>
      <span slot="title">分類</span>
    </el-menu-item>
    <el-menu-item index="4" disabled @click.native="clickMenu('auth')">
      <i class="el-icon-setting"></i>
      <span slot="title">權限管理</span>
    </el-menu-item>
    <el-menu-item index="5" @click.native="clickMenu('/index')">
      <i class="el-icon-setting"></i>
      <span slot="title">回到前台</span>
    </el-menu-item>
  </el-menu>
</template>

<script>


export default {
  data: () => ({
  }),
  methods: {
    clickMenu(path) {
      this.$router.push({ path });
    },
  },
  computed: {
    currenentUserEmail() {
      return `帳戶 ${this.$store.state.auth.currentUser.email}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  /deep/ .el-menu-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 15px;
  }
  .user__info {
    color: white;
    padding: 20px;
    text-align: left;
    .user__email {
      text-decoration: underline;
    }
  }
}
</style>
