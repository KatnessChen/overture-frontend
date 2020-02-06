<template>
  <el-menu
    default-active="article-management"
    background-color="#112233"
    text-color="#fff"
    active-text-color="#ffd04b">
    <Logo />
    <div class="user__info">
      <label class="label"></label>
      <span class="user__email">{{ currenentUserEmail }}</span>
      <Logout />
    </div>
    <el-menu-item index="article-management" @click.native="clickMenu('article')">
      <i class="el-icon-menu"></i>
      <span slot="title">文章總覽</span>
    </el-menu-item>
    <el-menu-item index="message-management" @click.native="clickMenu('comment')">
      <i class="el-icon-document"></i>
      <span slot="title">留言</span>
    </el-menu-item>
    <el-menu-item index="category-management" @click.native="clickMenu('category')">
      <i class="el-icon-setting"></i>
      <span slot="title">分類</span>
    </el-menu-item>
    <el-menu-item index="authority-management" disabled @click.native="clickMenu('auth')">
      <i class="el-icon-setting"></i>
      <span slot="title">權限管理</span>
    </el-menu-item>
    <el-menu-item index="back-to-blogpost" @click.native="clickMenu('/index')">
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
      return this.$store.state.auth.currentUser.email;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  box-sizing: border-box;
  padding-top: 20px;
  /deep/ .el-menu-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 15px;
  }
  /deep/ .logo__wrapper {
    .logo-main {
      color: gold;
      font-size: 30px;
      text-shadow: .5px .5px orangered;
    }
    .logo-slogan {
      color: goldenrod;
      font-size: 12px;
      text-shadow: .5px .5px navy;
    }
  }
  .user__info {
    color: white;
    padding: 25px;
    text-align: left;
    .user__email {
      display: inline-block;
      text-decoration: underline;
      margin-bottom: 12px;
    }
  }
}
</style>
