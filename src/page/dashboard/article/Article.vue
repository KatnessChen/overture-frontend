<template>
  <el-row :gutter="40">
    <el-col :span="10">
      <div class="header">
        <p>文章列表</p>
        <el-button size="mini" type="primary" @click="resetEditor" round>新增</el-button>
      </div>
      <DashboardArticleCards
        :articles="articles"
        @onUpdateArticle="onEmitUpdateArticle"
        @onDeleteArticle="onDeleteArticle"
        :isShowCurrentEditing="isUpdate"
      />
    </el-col>
    <el-col :span="14" style="padding-bottom: 20px">
      <div class="header">
        <p>{{ isUpdate ? '更新文章' : '新增文章' }}</p>
        <div class="header__right">
          <el-switch
            v-model="isEditorAutoSave"
            active-text="自動儲存"
            :disabled="editorData.status === 'public'"
          />
        </div>
      </div>
      <!-- ck editor -->
      <div class="article__editor__wrapper">
        <el-form label-position="left" label-width="80px">
          <el-form-item label="文章標題">
            <el-input v-model="editorData.title" label="title" maxlength="40" show-word-limit />
          </el-form-item>
        </el-form>
        <el-form label-position="left" label-width="80px" inline>
          <el-form-item label="文章分類">
            <el-select v-model="editorData.categoryId" placeholder="文章分類">
              <el-option v-for="item in categories"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章狀態">
            <el-select v-model="editorData.status" placeholder="狀態">
              <el-option key="draft" label="草稿" value="draft" />
              <el-option key="public" label="公開" value="public" />
            </el-select>
          </el-form-item>
          <el-form-item label="文章首圖" class="hero-image-form-item">
            <input type="file" id="hero-image-input" @change="onSelectFile" hidden>
            <label class="hero-image-input-label" for="hero-image-input">選擇檔案</label>
            <el-button
              type="text"
              :disabled="!editorData.heroImageBase64"
              @click="isShowHeroImagePop = true"
            >查看首圖</el-button>
          </el-form-item>
        </el-form>
        <ckeditor :editor="editor" v-model="editorData.content" :config="editorConfig"></ckeditor>
        <div class="article-editer-action-bar">
          <p class="text">{{ isEditorAutoSave ? autoSaveStatusText : '' }}</p>
          <el-button
            @click="onClickUpdateOrCreateArticle"
            size="mini" type="primary"
            :disabled="isEditorAutoSave"
          >
            {{ isUpdate ? '更新' : '新增' }}
          </el-button>
        </div>
      </div>
      <el-dialog
        title="文章首圖"
        :visible.sync="isShowHeroImagePop"
        width="30%"
      >
        <img class="hero-image" :src="editorData.heroImageBase64">
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data: () => ({
    isUpdate: false,
    isShowHeroImagePop: false,
    autoSaveStatusText: '...等待中',
    isEditorAutoSave: false,
    editor: ClassicEditor,
    editorConfig: {
      toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
    },
    timer: [],
  }),
  methods: {
    onSelectFile(e) {
      const file = e.target.files[0];
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      }).then((data) => {
        this.editorData.heroImageBase64 = data;
      });
    },
    loadArticles() {
      this.$store.dispatch('article/loadArticles');
    },
    onEmitUpdateArticle(id) {
      this.isUpdate = true;
      this.$store.commit('article/setEditingArticleId', id);
    },
    onClickUpdateOrCreateArticle() {
      if (!this.checkArticleForm()) {
        this.$message({
          message: '名稱、分類、內容為必填',
          type: 'warning',
        });
        return;
      }

      if (this.isUpdate) this.updateArticle();
      else this.createArticle();
    },
    updateArticle() {
      this.$store.dispatch('article/updateArticle', this.editorData).then(() => {
        if (this.isEditorAutoSave) {
          this.autoSaveStatusText = '文章已儲存 : )';
          setTimeout(() => {
            this.autoSaveStatusText = '...等待中';
          }, 5000);
        } else {
          this.$message({
            message: `您更新了文章：${this.editorData.title}`,
            type: 'success',
          });
        }
        this.loadArticles();
      }).catch((err) => {
        this.$message({
          message: err.data.message,
          type: 'warning',
        });
      });
    },
    createArticle() {
      this.$store.dispatch('article/createArticle', this.editorData)
        .then(() => {
          this.$message({
            message: `您新增了文章：${this.editorData.title}`,
            type: 'success',
          });
          this.resetEditor();
          this.loadArticles();
        })
        .catch((err) => {
          this.$message({
            message: err.data.message,
            type: 'warning',
          });
        });
    },
    onDeleteArticle(article) {
      this.$confirm(`確定刪除「${article.title}」？`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('article/deleteArticle', article.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.$store.dispatch('article/loadArticles');
        }).catch((err) => {
          this.$message({
            message: err.data.message,
            type: 'warning',
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    checkArticleForm() {
      const e = this.editorData;
      if (e.title && e.content && e.categoryId) return true;
      return false;
    },
    resetEditor() {
      this.isUpdate = false;
      this.$store.commit('article/setEditingArticleId', '');
    },
  },
  watch: {
    'editorData.status': {
      immediate: false,
      handler(status) {
        if (status === 'draft') this.isEditorAutoSave = true;
        if (status === 'public') this.isEditorAutoSave = false;
      },
    },
    isEditorAutoSave: {
      immediate: true,
      handler(autosave) {
        if (autosave) {
          if (this.timer.length === 0) {
            this.timer.push(setInterval(() => {
              this.autoSaveStatusText = '...文章儲存中';
              this.updateArticle();
            }, 10000));
          }
        } else {
          this.timer.forEach((element) => {
            clearInterval(element);
          });
          this.timer = [];
        }
      },
    },
  },
  computed: {
    articles() {
      return this.$store.state.article.articles;
    },
    editorData() {
      const { editingArticleId } = this.$store.state.article;
      const target = this.articles.find((a) => a.id === editingArticleId);
      return {
        title: target ? target.title : '',
        content: target ? target.content : '',
        categoryId: target ? target.categoryId : '',
        status: 'draft',
        heroImageBase64: target ? target.heroImageBase64 : '',
      };
    },
    categories() {
      const { categories } = this.$store.state.category;
      return categories;
    },
  },
  mounted() {
    this.loadArticles();
    this.$store.dispatch('category/getCategories');
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-col {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .hero-img-previewer {
    max-width: 100px;
    max-height: 100px;
  }
  .article__editor__wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 0;
    /deep/ .el-form {
      .el-form-item {
        margin-bottom: 10px;
      }
    }
    /deep/ .ck-editor {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
      box-sizing: border-box;
      .ck-editor__main {
        flex: 1;
        overflow: auto;
        .ck-content {
          height: 100%;
          box-sizing: border-box;
        }
      }
    }
  }
}


/deep/ .el-form.el-form--label-left.el-form--inline {
  text-align: left;
  .el-form-item {
    width: calc(50% - 5px);
    text-align: left;
    &:nth-child(2) {
      margin-right: 0;
    }
    .el-form-item__content {
      width: calc(100% - 80px);
      .el-select {
        width: 100%;
      }
    }
    &.hero-image-form-item {
      width: 100%;
      .el-form-item__content {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        height: 40px;
        .el-button {
          margin-top: 0;
          padding: 0;
          line-height: 40px;
        }
      }
    }
  }
}

.hero-image {
  max-width: 100%;
}

.hero-image-input-label {
  color: $highlight;
  margin-right: 12px;
  font-family: '新細明體';
}
</style>
