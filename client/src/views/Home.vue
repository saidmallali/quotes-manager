<template>
  <div class="home">
    <h1>home page</h1>
    <div v-for="quote in publicQuotes" :key="quote._id">{{ quote.quote }}</div>
    <!-- <ul>
      <li v-for="quote in publicQuotes" :key="quote._id">{{ quote.quote }}</li>
    </ul> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      quote: ""
    };
  },
  computed: {
    publicQuotes() {
      // return this.$store.state.publicQuotes;
      return this.$store.getters["quotes/getQuotes"];
    }
  },
  created() {
    this.$store
      .dispatch("quotes/fetchPublicQuotes")
      .then(() => this.$emit("ready"))
      .catch(err => console.error(err.message));
  }
};
</script>
