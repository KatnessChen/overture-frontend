<template>
  <div class="singelArtilce__page">
    <BlogpostNavMenu />
    <article class="article__wrapper">
      <h2 class="article__title">{{ article.title }}</h2>
      <div class="article__metadata">
        <p>分類：{{ article.categoryName }}</p>
        <p>發表/更新時間：{{ toLocaleDateTimeString(article.timestamp) }}</p>
        <i
          class="el-icon-edit"
          v-if="isSignedIn"
          @click="onClickEdit(article.id)"
        >
          編輯文章
        </i>
      </div>
      <div class="article__content__container ck-content" v-html="article.content"></div>
    </article>
  </div>
</template>

<script>
const utils = require('@/utils');

export default {
  data: () => ({
  }),
  methods: {
    toLocaleDateTimeString: utils.toLocaleDateTimeString,
    loadArticles() {
      this.$store.dispatch('article/loadArticles');
    },
    onClickEdit(id) {
      this.$store.commit('article/setEditingArticleId', id);
      this.$router.push({ path: '/dashboard/article/', id });
    },
  },
  computed: {
    article() {
      const article = this.$store.state.article.articles
        .filter((item) => item.id === this.$route.params.articleId);
      return article[0];
    },
    isSignedIn() {
      return this.$store.state.auth.currentUser != null;
    },
  },
  mounted() {
    if (this.$store.state.article.articles.length === 0) {
      this.loadArticles();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/single-article.scss';

</style>
