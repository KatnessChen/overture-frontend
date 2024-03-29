<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <div class="header">
        <p>分類列表</p>
      </div>
      <el-input
        class="category-input"
        v-model="input"
        placeholder="新增分類"
        maxlength="10"
        show-word-limit
      />
      <Button
        :label="isEditing ? '更新名稱' : '新增分類'"
        @click="onUpdateOrCreateCategory"
        size="medium"
      />
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(category, index) in categoryStatistics(categories, articles)"
          :name="index"
          :key="index"
        >
          <template slot="title">
            <p class="category__title">
              {{ category.name }} ({{ category.count }})
            </p>
            <i class="el-icon-delete" @click.stop="onClickDeleteCategory(category)"></i>
            <i class="el-icon-edit-outline" @click.stop="onClickRenameCategory(category)"></i>
          </template>
          <div>
            <div v-if="category.articles">
              <p v-for="(article, index) in category.articles" :key="index" class="article__title">
                {{ article }}
              </p>
            </div>
            <div v-else>尚無文章</div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';
import utils from '@/utils';

export default {
  data: () => ({
    input: '',
    isEditing: false,
    activeNames: ['1'],
  }),
  methods: {
    categoryStatistics: utils.categoryStatistics,
    onUpdateOrCreateCategory(category) {
      if (!this.input) {
        this.$message({
          message: '未輸入名稱',
          type: 'warning',
        });
        return;
      }
      // 更新分類
      if (this.isEditing) {
        this.$store.dispatch('category/renameCategory', {
          newName: this.input,
          categoryId: this.isEditing,
        }).then(() => {
          this.$message({
            message: '已更新名稱！',
            type: 'success',
          });
          this.loadCategories();
        }).catch((err) => {
          this.$message({
            message: err.data.message,
            type: 'warning',
          });
        });
      } else {
        // 新增分類
        this.$store.dispatch('category/createCategory', this.input).then(() => {
          this.$message({
            message: `您新增了分類：${this.input}`,
            type: 'success',
          });
          this.input = '';
          this.loadCategories();
        }).catch((err) => {
          this.$message({
            message: err.data.message,
            type: 'warning',
          });
        });
      }
    },
    onClickDeleteCategory(category) {
      if (category.count >= 1) {
        this.$message({
          message: '分類內有文章，請先更改文章類別，或者刪除文章！',
          type: 'warning',
        });
      } else {
        this.$confirm(`確定刪除「${category.name}」分類？`, '提示').then(() => {
          this.$store.dispatch('category/deleteCategory', category.id).then(() => {
            this.$message({
              message: `已刪除分類「${category.name}」！`,
              type: 'success',
            });
            this.loadCategories();
          }).catch((err) => {
            this.$message({
              message: err.data.message,
              type: 'warning',
            });
          });
        });
      }
    },
    onClickRenameCategory(category) {
      this.isEditing = category.id;
      this.input = category.name;
    },
    loadCategories() {
      this.$store.dispatch('category/getCategories');
    },
    loadArticles() {
      this.$store.dispatch('article/loadArticles');
    },
  },
  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
      articles: (state) => state.article.articles,
    }),
  },
  mounted() {
    this.loadCategories();
    this.loadArticles(); // TODO 待優化
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/page-category.scss';

</style>
