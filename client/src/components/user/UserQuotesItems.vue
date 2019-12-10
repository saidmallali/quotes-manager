<template>
  <div id="userQuotesItems">
    <div v-for="quote in userQuotes" :key="quote.key" class="activity">
      <div class="post-content">
        <div>
          <p>{{ quote.quote }}</p>
        </div>
      </div>

      <div class="thread-details">
        <span>{{ quote.date }}</span>
        <span>{{ quote.like }}</span>
        <span>{{ quote.statu }}</span>
        <button @click="editQuote(quote._id)" class="btn-green btn-xsmall edit">edit</button>
        <button @click="deleteQuote(quote._id)" class="btn-red btn-xsmall delete">delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userQuotesItems",

  props: {
    userQuotes: {
      required: true,
      type: Array
    }
  },
  methods: {
    editQuote(id) {
      this.$store.dispatch("quotes/editeQuote", id);
    },
    deleteQuote(id) {
      this.$store.dispatch("quotes/deleteQuote", id);
    }
  }
};
</script>
<style lang="scss">
#userQuotesItems {
  .edit {
    margin-right: 10px;
    margin-left: 10px;
    font-size: 1.3rem;
  }
  .delete {
    font-size: 1.3rem;
  }
}
</style>

