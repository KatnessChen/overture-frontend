<template>
  <div class="index__warpper">
    <BlogpostNavMenu />
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
            <section class="el-cards__wrapper">
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
                :effect="activatedCategories.includes(c.id) ? 'dark' : 'light'"
                @click="toggleCategory(c.id)"
              >
                {{ c.name }} ({{ c.count }})
              </el-tag>
            </section>
            <!-- <section class="metadata-area-section">
              <p class="title">月份</p>
              Comming soon ...
            </section> -->
          </el-col>
        </el-row>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import utils from '@/utils';

export default {
  data: () => ({
    cp: 1, // currentPage
    app: 4, // articlesPerPage
    activatedCategories: ['-LwD2YYmoTQaJ8dw5dsE'], // 預設展示前端分類
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
    toggleCategory(categoryId) {
      if (!this.activatedCategories.includes(categoryId)) {
        this.activatedCategories.push(categoryId);
      } else {
        const index = this.activatedCategories.indexOf(categoryId);
        this.activatedCategories.splice(index, 1);
      }
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
      return this.articles
        .filter((item) => this.activatedCategories.includes(item.categoryId));
    },
  },
  mounted() {
    this.loadCategories();
    this.loadArticles();
  },
};
</script>

<style lang="scss" scoped>
.index__warpper {
  background-color: #112233;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .body {
    // flex: 1;
    width: 100%;
    padding: 0;
    padding-top: 156px;
    box-sizing: border-box;
    height: 100%;
    .content {
      margin: 0 auto;
      width: 1084px;
      height: 100%;
    }
    /deep/ .el-row {
      color: $white;
      overflow: hidden;
      height: 100%;
      .el-col {
        height: 100%;
        &.articles-area {
          display: flex;
          flex-direction: column;
        }
        /deep/ .el-cards__wrapper {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          overflow: auto;
          padding-right: 20px;
          &::-webkit-scrollbar {
            width: 11px;
          }
          &::-webkit-scrollbar-track {
            background: $scrollbarBG;
          }
          &::-webkit-scrollbar-thumb {
            background-color: $thumbBG;
            border-radius: 6px;
            border: 3px solid $scrollbarBG;
          }
          .el-card.article__item {
            flex-basis: calc(50% - 10px);
            overflow: hidden;
            margin-bottom: 30px;
            border: none;
            height: fit-content !important;
            cursor: pointer;
            .article__image {
              width: 100%;
              height: 400px;
              background-size: cover;
              background-position: center center;
            }
            .article__body {
              padding: 16px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              box-sizing: border-box;
              font-size: 16px;
              .article__body__title {
                @include text-hidden(2);
                font-size: 23px;
                line-height: 1.3;
                letter-spacing: 0.5px;
                flex-basis: 100%;
                height: 56px;
              }
              .category, .time, .el-button {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}

.el-pagination {
  width: fit-content;
  margin-left: auto;
  margin-bottom: 12px;
}

.el-tag {
  width: fit-content;
  margin-bottom: 5px;
  cursor: pointer;
  &.active {

  }
  &:not(:last-child) {
    margin-right: 5px;
  }
}

.metadata-area {
  padding-top: 26px;
  .metadata-area-section {
    margin-bottom: 20px;
  }
  .title {
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 12px;
    padding-left: 14px;
    position: relative;
    color: #CFD8DC;
    &::before {
      content: '';
      position: absolute;
      width: 5px;
      height: 14px;
      left: 0;
      top: 1px;
      background-color: #CFD8DC;
    }
  }
}
</style>
