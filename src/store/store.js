import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import firebase from '@/connections/firebase';

const firebaseAuth = firebase.auth();

Vue.use(Vuex);

const url = 'https://overture-blog.herokuapp.com';

const article = {
  namespaced: true,
  state: {
    articles: [],
  },
  actions: {
    loadArticles({ state }) {
      Axios({ url: `${url}/article` }).then((res) => {
        state.articles = res.data;
      });
    },
    createArticle(context, payload) {
      Axios({
        method: 'post',
        url: `${url}/article`,
        data: {
          title: payload.title,
          content: payload.content,
          categoryId: payload.categoryId,
          status: payload.status,
          heroImageBase64: payload.heroImageBase64,
          timestamp: (new Date()).getTime(),
        },
      });
    },
    updateArticle(context, payload) {
      Axios({
        method: 'put',
        url: `${url}/article/update`,
        data: {
          title: payload.title,
          content: payload.content,
          categoryId: payload.categoryId,
          articleId: payload.articleId,
          status: payload.status,
          heroImageBase64: payload.heroImageBase64,
          timestamp: (new Date()).getTime(),
        },
      });
    },
    deleteArticle(context, payload) {
      Axios({
        method: 'delete',
        url: `${url}/article/delete`,
        data: {
          id: payload,
        },
      });
    },
  },
};

const category = {
  namespaced: true,
  state: {
    categories: [],
  },
  actions: {
    getCategories({ state }) {
      Axios({ url: `${url}/category` }).then((res) => {
        state.categories = res.data;
      });
    },
    createCategory({ state }, payload) {
      Axios({
        method: 'post',
        url: `${url}/category`,
        data: { name: payload },
      });
    },
    deleteCategory({ state }, payload) {
      Axios({
        method: 'delete',
        url: `${url}/category/delete`,
        data: { categoryId: payload },
      });
    },
    renameCategory({ state }, payload) {
      Axios({
        method: 'put',
        url: `${url}/category/rename`,
        data: {
          categoryId: payload.categoryId,
          categoryName: payload.newName,
        },
      });
    },
  },
};

const comment = {
  namespaced: true,
};

const auth = {
  namespaced: true,
  state: {
    currentUser: null,
    apiMsg: {},
  },
  actions: {
    register({ state }, payload) {
      const { email, password } = payload;
      firebaseAuth.createUserWithEmailAndPassword(email, password).then((credential) => {
        // const { uid } = firebaseAuth.currentUser;
        // // firebaseDb.ref('/user/' + uid).set({ uid, email });
        const response = {
          code: 'auth/register-success',
        };
        // state.apiMsg = response;
      }).catch((error) => {
        // state.apiMsg = error;
      });
    },
    signin({ state }, payload) {
      const { email, password } = payload;
      return new Promise((resolve, reject) => {
        firebaseAuth.signInWithEmailAndPassword(email, password).then((credential) => {
          state.currentUser = credential.user;
          resolve(credential);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    signout({ state }) {
      firebaseAuth.signOut().then(() => {
        state.apiMsg = {
          code: 'auth/logout-success',
          message: '已登出。',
        };
        state.currentUser = null;
      }).catch((error) => {
        state.apiMsg = error;
      });
    },
  },
};

const ckEditor = {
  namespaced: true,
};

const other = {
  namespaced: true,
  state: {
    articlesPerPage: 2,
  },
};

export default new Vuex.Store({
  modules: {
    article,
    category,
    comment,
    auth,
    ckEditor,
    other,
  },
});
