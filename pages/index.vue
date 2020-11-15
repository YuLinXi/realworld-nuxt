<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a @click.prevent="handleSwitchTab('FEED')" class="nav-link" :class="[tab === 'FEED' ? 'active' : 'disabled']" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a @click.prevent="handleSwitchTab('GLOBAL_FEED')" class="nav-link" :class="[tab === 'GLOBAL_FEED' ? 'active' : 'disabled']" href="">Global Feed</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-9">
          <feed v-show="tab === 'FEED'" type="FEED" key="FEED"/>
          <global-feed v-show="tab === 'GLOBAL_FEED'" type="GLOBAL" key="GLOBAL_FEED"/>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Feed from "@/components/Feed";

export default {
  name: "Index",
  data() {
    return {
      tab: 'FEED',
      page: 1,
      pageSize: 10
    }
  },
  components: {
    Feed,
    GlobalFeed: Feed,
  },
  methods: {
    handleSwitchTab(tab) {
      this.tab = tab;
    },
  }
}
</script>

<style scoped>

</style>
