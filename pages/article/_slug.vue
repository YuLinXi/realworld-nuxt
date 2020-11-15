<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <div class="article-meta">
          <nuxt-link :to="'/profile/' + article.author.username">
            <img :src="article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'">
          </nuxt-link>
          <div class="info">
            <nuxt-link :to="'/profile/' + article.author.username" class="author">
              {{article.author.username}}
            </nuxt-link>
            <span class="date">{{article.updatedAtDisplay}}</span>
          </div>
          <button
            @click="handleFollow"
            class="btn btn-sm btn-outline-secondary"
            :class="{ active: article.author.following }"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{ article.author.username }}
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{ active: article.favorited }"
            @click="handleFavorite"
          >
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          <div>
            <p v-html="$md.render(article.body)"></p>
          </div>
          <ul class="tag-list">
            <li v-for="tag in article.tagList " class="tag-default tag-pill tag-outline">{{tag}}</li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>

          <button
            class="btn btn-sm btn-outline-secondary"
            :class="{ active: article.author.following }"
            @click="handleFollow"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{ article.author.username }}
          </button>
          &nbsp;
          <button
            @click="handleFavorite"
            class="btn btn-sm btn-outline-primary"
            :class="{ active: article.favorited }"
          >
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
              <i class="ion-edit"></i>
              <i class="ion-trash-a"></i>
            </span>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "slug",
  data() {
    return {
      article: {
        author: {
          bio: null,
          following: false,
          image: "",
          username: ""
        },
        body: "",
        createdAt: "",
        description: "",
        favorited: false,
        favoritesCount: 0,
        slug: "",
        tagList: [],
        title: "",
        updatedAt: "",
      },
    }
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const { slug } = this.$route.params;
      try {
        const { article } = await this.$axios(`/articles/${slug}`);
        this.article = article;
      } catch (err) {
        //
      }
    },
    async handleFavorite() {
      try {
        const { slug } = this.$route.params;
        const request = this.article.favorited ? this.$axios.delete : this.$axios.post
        const { article } = await request(`/articles/${slug}/favorite`);
        this.article = article;
      } catch (err) {
        //
      }
    },
    async handleFollow() {
      try {
        const request = this.article.author.following ? this.$axios.delete : this.$axios.post
        const { profile } = await request(`/profiles/${this.article.author.username}/follow`);
        this.article.author = profile;
      } catch (err) {
        //
      }
    },
  }
}
</script>

<style scoped>

</style>
