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
        <Button type="plain" label="編輯" @click="$emit('onUpdateArticle', a.id)"/>
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
.dashboardArticleCard__wrapper {
  width: 100%;
  color: #123;
}
.el-card + .el-card {
  margin-top: 13px;
}
/deep/ .el-card {
  .el-card__header > div {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    .header__title {
      flex: 1;
      text-align: left;
      @include text-hidden;
    }
    .el-button {
      padding: 3px 0;
      border: none;
      color: $highlight;
    }
  }
  .content {
    text-align: left;
    font-size: 12px;
    height: 120px;
    overflow: hidden;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      // background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      background-color: rgba(255, 255, 255, 0.8);
      bottom: 0;
      left: 0;
    }
  }
  &.is-editing {
    border: 1px solid $highlight;
    .content {
      &::after {
        display: none;
      }
    }
  }
}

.article-meta-data {
  display: flex;
  margin-bottom: 12px;
  span {
    flex: 1;
    font-size: 12px;
    font-weight: normal;
    color: gray;
    white-space: nowrap;
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
}
</style>
