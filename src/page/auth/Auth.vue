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
          :loading="signin.generalLoading"
          @click="onClickSignin('admin')">
          確定登入
        </el-button>
      </section>
    </form>
    <p class="guidance">或</p>
    <div>
      <el-button slot="reference" type="primary" plain
        :loading="signin.guestLoading"
        @click="onClickSignin('guest')">
        以訪客登入
      </el-button>
      <el-tooltip effect="dark" content="僅有瀏覽無編輯權限" placement="right">
        <i class="el-icon-warning-outline"></i>
      </el-tooltip>
    </div>
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
      generalLoading: false,
      guestLoading: false,
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
    onClickSignin(identity) {
      this.signin[`${identity}Loading`] = true;
      const isAdmin = identity === 'admin';
      this.$store.dispatch('auth/signin', {
        email: isAdmin ? this.signin.account : 'guest@gmail.com',
        password: isAdmin ? this.signin.password : '123456',
      }).then((response) => {
        if (response.user) {
          this.$message({
            message: `以 ${response.user.email} 身分登入`,
            type: 'success',
          });
          this.signin[`${identity}Loading`] = false;
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
@import '@/assets/scss/components/page-auth.scss';

</style>
