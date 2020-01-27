<template>
  <nav class="nav" v-cloak>
    <h1 class="logo__wrapper">
      <router-link tag="span" to="/index">
        <h1 class="logo-main">OVERTURE</h1>
      </router-link>
      <p class="logo-slogan">Murmurs about web and life.</p>
    </h1>
    <div class="nav__item__wrapper">
      <div class="nav__item" v-show="isSignedIn">
        <router-link class="link" to="/dashboard/article">
          {{ currenentUserEmail }}
        </router-link>
      </div>
      <div class="nav__item" v-show="isSignedIn">
        <a @click="onSignOut" class="link">
          登出
        </a>
      </div>
      <div class="nav__item" v-show="!isSignedIn">
        <router-link class="link" to="/auth">
          登入
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
  }),
  computed: {
    ...mapState({
      apiMsg: (state) => state.auth.apiMsg,
    }),
    currenentUserEmail() {
      if (this.$store.state.auth.currentUser) {
        const account = this.$store.state.auth.currentUser.email;
        // return `進入管理台 ( 登入身分 : ${this.$store.state.auth.currentUser.email})`;
        return `${account} 你好`;
      }
      return '登入';
    },
    isSignedIn() {
      return this.$store.state.auth.currentUser != null;
    },
  },
  watch: {
    apiMsg() {
      this.$message({
        message: this.apiMsg.message,
        type: 'success',
      });
    },
  },
  methods: {
    clickMenu(path) {
      this.$router.push(path);
    },
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
.nav {
  background-color: #C4183C;
  height: $nav-height;
  color: $white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 75%;
    background: linear-gradient(to left, #a437AC, #C4183C);
    opacity: .5;
    z-index: 2;
  }
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
  .nav__item__wrapper {
    display: flex;
    .nav__item {
      &+.nav__item {
        margin-left: 20px;
      }
    }
  }
  .link {
    cursor: pointer;
    z-index: 3;
    position: relative;
    text-decoration: none;
    color: ivory;
    text-decoration: underline;
  }
}
</style>
