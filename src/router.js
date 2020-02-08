import Vue from 'vue';
import Router from 'vue-router';
import firebase from '@/connections/firebase';

Vue.use(Router);

// blogpost
const index = require('./views/Blogpost/IndexView.vue').default;
const singleArticle = require('./page/blogpost/SingleArticle.vue').default;

// auth
const auth = require('./page/auth/Auth.vue').default;

// dashboard
const dashboardView = require('./views/Dashboard/DashboardView.vue').default;
const article = require('./page/dashboard/article/Article.vue').default;
const category = require('./page/dashboard/category/Category.vue').default;

const firebaseAuth = firebase.auth();

const guard = (to, from, next) => {
  const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      next();
      unsubscribe();
    } else {
      // eslint-disable-next-line
      alert('請先登入 !');
      window.location.href = '/index';
    }
  });
};

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      component: index,
    },
    {
      path: '/blogpost/article/:articleId',
      component: singleArticle,
    },
    {
      path: '/auth',
      component: auth,
    },
    {
      path: '/dashboard',
      component: dashboardView,
      beforeEnter: (to, from, next) => { guard(to, from, next); },
      children: [
        {
          path: 'article',
          component: article,
        },
        {
          path: 'category',
          component: category,
        },
      ],
    },
    {
      path: '/',
      component: index,
    },
  ],
});
