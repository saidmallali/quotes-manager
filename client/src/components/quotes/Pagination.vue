<template>
  <div class="pagination-container">
    <div class="pagination">
      <button
        type="button"
        class="btn-blue-outlined btn-xsmall btn"
        v-if="page != 1"
        @click="page--"
      >privious</button>
      <button
        type="button"
        class="btn-blue-outlined btn-xsmall btn"
        v-for="pageNumber in pages.slice(page-1, page+5)"
        :key="pageNumber"
        @click="page = pageNumber"
      >{{pageNumber}}</button>
      <button
        type="button"
        @click="page++"
        v-if="page < pages.length"
        class="btn-blue-outlined btn-xsmall btn"
      >next</button>
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
      this.$store
        .dispatch("quotes/fetchPublicQuotes", {
          page: this.page,
          limit: this.perPage
        })
        .then(() => {
          this.$emit("ready");
        })
        .catch(err => console.error(err.message));
    },

    setPages() {
      //update number of pages
      let numberOfPages = Math.ceil(this.quotes / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    }
  },
  created() {
    this.getQuotes();
    this.setPages();
  },
  watch: {
    quotes() {
      this.setPages();
    },
    page() {
      this.getQuotes();
    }
  }
};
</script>

<style lang="scss">
.pagination-container {
  padding-left: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  .pagination {
    .btn {
      border-radius: 0;
      border: 1px;
      margin-right: 5px;

      &:hover {
        background-color: #4dbaf6;
      }
    }
  }
}
</style>