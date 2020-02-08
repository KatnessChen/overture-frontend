import Vue from 'vue';

import ElementUI from 'element-ui';

import router from './router';
import store from './store/store';
import App from './App.vue';
import firebase from '@/connections/firebase';

// styles
import '@/assets/scss/reset.scss';
import '@/assets/scss/rss/element-variables.scss';
import '@/assets//scss/ckeditor/custom-style.scss';

Vue.use(ElementUI);

// 註冊所有 component
const requireComponent = require.context(
  './components',
  true,
  /[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const c = fileName.replace('.vue', '').split('/');

  const componentName = c[c.length - 1];
  Vue.component(
    componentName,
    componentConfig.default || componentConfig,
  );
});
Vue.config.productionTip = false;

const firebaseAuth = firebase.auth();
firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    store.state.auth.currentUser = user;
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
