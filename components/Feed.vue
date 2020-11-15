<template>
  <div class="Feed-wrapper">
    <div class="Feed-wrapper-empty" v-if="!articles.length">
      {{ loading ? 'Loading articles...' : 'No articles are here... yet.'  }}
    </div>
    <template v-else>
      <div
        v-for="article in articles"
        :key="article.slug"
        class="article-preview"
      >
        <div class="article-meta">
          <nuxt-link class="" :to="'/profile/' + article.author.username">
            <img :src="article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'">
          </nuxt-link>
          <div class="info">
            <nuxt-link class="author" :to="'/profile/' + article.author.username">
              {{article.author.username}}
            </nuxt-link>
            <span class="date">{{article.updatedAtDisplay}}</span>
          </div>
          <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart"></i>&nbsp;{{article.favoritesCount}}
          </button>
        </div>
        <a @click.prevent="handleReadMore(article)" class="preview-link">
          <h1>{{article.title}}</h1>
          <p>{{article.description}}</p>
          <span>Read more...</span>
        </a>
      </div>
    </template>
    <nav>
      <ul class="pagination">
        <li v-for="page in Math.ceil(articlesCount / 10)" :class="{'page-item': true, 'active': page == currentPage}">
          <a href="" class="page-link" @click.prevent.stop="handlePageChange(page)"> {{ page }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Feed",
  data() {
    return {
      currentPage: 1,
      articles: [],
      articlesCount: 0,
      loading: false
    }
  },
  created() {
    this.getArticles();
  },
  props: {
    type: String,
  },
  methods: {
    async getArticles() {
      const URL = {
        FEED: '/articles/feed',
        GLOBAL: '/articles/'
      };
      try {
        this.loading = true;
        const { articles, articlesCount } = await this.$axios.get(URL[this.type], {
          params: {
            limit: 10,
            offset: 10 * (this.currentPage - 1),
          }
        })
        this.articles = articles;
        this.articlesCount = articlesCount;
      } catch (err) {

      } finally {
        this.loading = false;
      }
    },
    handleReadMore(article) {
      this.$router.push(`/article/${article.slug}`)
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getArticles();
    }
  }
}
</script>

<style scoped>
 .Feed-wrapper-empty {
    margin-top: 10px;
 }
</style>
