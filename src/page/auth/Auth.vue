<template>
  <div class="auth__wrapper">
    <BlogpostNavMenu />
    <!-- <form class="form register__form">
      <section class="form__title">註冊</section>
      <section class="form__body">
        <el-input type="email" placeholder="電子信箱" v-model="register.account"></el-input>
        <el-input type="passwaord" placeholder="輸入密碼" v-model="register.password"></el-input>
        <el-button type="primary"
          :loading="register.loading"
          @click="onClickRegister">
          確定註冊
        </el-button>
      </section>
    </form> -->
    <form class="form login__form">
      <section class="form__title">登入</section>
      <section class="form__body">
        <el-input type="email" placeholder="Email" v-model="signin.account"></el-input>
        <el-input show-password placeholder="Password" v-model="signin.password"></el-input>
        <el-button type="primary"
          :loading="signin.loading"
          @click="onClickSignin">
          確定登入
        </el-button>
      </section>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    register: {
      account: '',
      password: '',
      loading: false,
    },
    signin: {
      account: '',
      password: '',
      loading: false,
    },
  }),
  computed: {
    ...mapState({
      apiMsg: (state) => state.auth.apiMsg,
      currentUser: (state) => state.auth.currentUser,
    }),
  },
  watch: {
    apiMsg() {
      // if (!this.apiMsg.data) return;
      if (this.apiMsg.code === 'auth/register-success') {
        this.$message({
          message: this.apiMsg.data.message,
          type: 'success',
        });
      } else {
        this.$message({
          message: `${this.apiMsg.message}`,
          type: 'warning',
        });
      }
      this.signin.loading = false;
    },
  },
  methods: {
    onClickRegister() {
      this.register.loading = true;
      this.$store.dispatch('auth/register', {
        email: this.register.account,
        password: this.register.password,
      });
    },
    onClickSignin() {
      this.signin.loading = true;
      this.$store.dispatch('auth/signin', {
        email: this.signin.account,
        password: this.signin.password,
      }).then((response) => {
        if (response.user) {
          this.$message({
            message: `以 ${response.user.email} 身分登入`,
            type: 'success',
          });
          this.signin.loading = false;
          this.$router.push({ path: '/dashboard/article' });
        }
      }).catch((error) => {
        this.$message({
          message: error.message,
          type: 'warning',
        });
        this.signin.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth__wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 260px;
  .form {
    width: 300px;
    color: $white;
    margin: 0 auto 40px auto;
    text-align: center;
    .form__title {
      font-size: 20px;
      margin-bottom: 12px;
    }
    .form__body {
      .el-input {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
