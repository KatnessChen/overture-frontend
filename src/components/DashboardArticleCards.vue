<template>
  <div class="dashboardArticleCard__wrapper">
    <el-card
      v-for="a in articles"
      class="box-card"
      :class="{'is-editing': a.id == $store.state.article.editingArticleId}"
      :key="a.id"
      shadow="hover"
    >
      <div slot="header">
        <span class="header__title">{{ a.title }}</span>
        <Button type="plain" label="編輯" @click="onUpdateArticle(a.id)"/>
        <Button type="plain" label="刪除" @click="$emit('onDeleteArticle', a)"/>
      </div>
      <div class="article-meta-data">
        <span>狀態：{{ toZh(a.status) }}</span>
        <span>類別：{{ a.categoryName || '沒有分類' }}</span>
        <span>{{ toLocaleDateTimeString(a.timestamp) || '0000-00-00 00:00:00'}}</span>
      </div>
      <div class="content" v-html="a.content">
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const utils = require('@/utils');

export default {
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
  }),
  computed: {
    ...mapState(['category/categories']),
  },
  methods: {
    toLocaleDateTimeString: utils.toLocaleDateTimeString,
    onUpdateArticle(articleId) {
      this.$store.commit('article/setEditingArticleId', articleId);
      this.$emit('onUpdateArticle', articleId);
    },
    onClickArticle(articleId) {
      this.$emit('onClickArticle', articleId);
    },
    toZh(text) {
      switch (text) {
        case 'draft':
          return '草稿';
        case 'public':
          return '公開';
        default:
          return `Sorry, we are out of ${text}.`;
      }
    },
  },
  mounted() {
    this.$store.dispatch('category/getCategories');
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/dashboard-article-cards';

</style>
