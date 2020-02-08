<template>
  <main class="body">
    <div class="content">
      <el-row :gutter="40">
        <el-col :span="17" class="articles-area">
          <el-pagination
            layout="prev, pager, next"
            :total="displayedArticle.length"
            :hide-on-single-page="false"
            :current-page.sync="cp"
            :page-size="app"
            small>
          </el-pagination>
          <section class="el-cards__wrapper"
            v-loading="displayedArticle.length < 1"
            element-loading-background="transparent"
            element-loading-text="載入文章中">
            <el-card
              class="article__item"
              :body-style="{ padding: '0px' }"
              v-for="a in pageredArticles(displayedArticle, app, cp)"
              :key="a.id"
              @click.native="onClickArticle(a.id)"
              >
              <div class="article__image"
                :style="{'background-image': `url('${a.heroImageBase64}')`}"
                >
                <img v-show="!a.heroImageBase64" src="https://picsum.photos/id/835/400/400">
              </div>
              <div class="article__body">
                <div class="article__body__title">{{ a.title }}</div>
                <span class="category">{{ a.categoryName }}</span>
                <time class="time">{{ toLocaleDateTimeString(a.timestamp) }}</time>
                <el-button type="text">More...</el-button>
              </div>
            </el-card>
          </section>
        </el-col>
        <el-col :span="7" class="metadata-area">
          <section class="metadata-area-section">
            <p class="title">文章分類</p>
            <el-tag
              v-for="c in categoryStatistics(categories, articles)"
              :key="c.id"
              :effect="activatedCategory === c.id ? 'dark' : 'light'"
              @click="onClickCategory(c.id)"
            >
              {{ c.name }} ({{ c.count }})
            </el-tag>
            <el-tag
              :effect="activatedCategory === 'all' ? 'dark' : 'light'"
              @click="onClickCategory('all')"
            >全部 ({{ articles.length }})</el-tag>
          </section>
        </el-col>
      </el-row>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import utils from '@/utils';

export default {
  data: () => ({
    cp: 1, // currentPage
    app: 4, // articlesPerPage
    activatedCategory: '-LwD2YYmoTQaJ8dw5dsE', // 預設展示前端分類
  }),
  methods: {
    toLocaleDateTimeString: utils.toLocaleDateTimeString,
    pageredArticles: utils.pagered,
    categoryStatistics: utils.categoryStatistics,
    loadCategories() {
      this.$store.dispatch('category/getCategories');
    },
    loadArticles() {
      this.$store.dispatch('article/loadArticles');
    },
    onClickArticle(articleId) {
      this.$router.push({ path: `/blogpost/article/${articleId}` });
    },
    onClickCategory(categoryId) {
      this.activatedCategory = categoryId;
    },
  },
  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
    }),
    articles() {
      return this.$store.state.article.articles.filter((item) => item.status === 'public');
    },
    displayedArticle() {
      if (this.activatedCategory === 'all') return this.articles;
      return this.articles
        .filter((item) => this.activatedCategory === item.categoryId);
    },
  },
  mounted() {
    this.loadCategories();
    this.loadArticles();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/page-landing-content.scss';
</style>
