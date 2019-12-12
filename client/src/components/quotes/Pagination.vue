<template>
  <div>
    <div class>
      <button type="button" class="btn" v-if="page != 1" @click="page--">privious</button>
      <button
        type="button"
        class="btn"
        v-for="pageNumber in pages.slice(page-1, page+5)"
        :key="pageNumber"
        @click="page = pageNumber"
      >{{pageNumber}}</button>
      <button type="button" @click="page++" v-if="page < pages.length" class="btn">next</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      //   quotess: this.$store.getters["quotes/getcountPublicQuotes"],
      page: 1,
      perPage: 5,
      pages: []
    };
  },
  computed: {
    quotes() {
      return this.$store.getters["quotes/getcountPublicQuotes"];
    }
  },
  methods: {
    getQuotes() {
      //fetch data from server
    },

    setPages() {
      let numberOfPages = Math.ceil(this.quotes / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    }
  },
  created() {
    // this.getPosts();
  },
  watch: {
    quotes() {
      this.setPages();
    }
  }
};
</script>

<style lang="scss">
</style>