<template>
  <div class="home">
    <h2 v-if="publicQuotes">Popular Quotes</h2>
    <div class="col col-3">
      <SearchQuote :user="false" />
      <p class="getAll" @click="getQuotes">get all quotes</p>
    </div>
    <AppSpinner v-if="!publicQuotes" />
    <!-- <div v-if="publicQuotes.length === 0">Sorry, no Quotes matched</div> -->
    <!-- <div>Sorry, no results matched your search.</div> -->

    <div v-if="publicQuotes" class="activity-list push-top">
      <div v-for="quote in publicQuotes" :key="quote._id" class="activity">
        <div class="testimonial-quote group">
          <img :src="quote.avatar ? quote.avatar : defaultAvatar" />
          <div class="quote-container">
            <blockquote>
              <p>{{ quote.quote }} ”</p>
            </blockquote>
            <cite>
              <span>{{ quote.name }}</span>
              <br />
              published by: {{ quote.username }}
            </cite>
          </div>
        </div>
      </div>
    </div>
    <Pagination :user="false" />
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
import AppSpinner from "@/components/layout/AppSpinner";
import SearchQuote from "@/components/quotes/SearchQuote";
import Pagination from "@/components/quotes/Pagination";
export default {
  name: "home",
  components: {
    AppSpinner,
    SearchQuote,
    Pagination
  },
  data() {
    return {
      defaultAvatar:
        "https://icon-library.net/images/avatars-icon/avatars-icon-16.jpg"
    };
  },
  computed: {
    publicQuotes() {
      // return this.$store.state.publicQuotes;
      return this.$store.getters["quotes/getQuotes"];
    }
  },
  methods: {
    getQuotes() {
      this.$store.dispatch("quotes/fetchPublicQuotes", {
        page: 1,
        limit: 5
      });
    }
  },
  created() {
    this.$emit("ready");
  }
};
</script>
<style lang="scss">
.home {
  width: 100%;
}
.testimonial-quote {
  font-size: 16px;
}

.testimonial-quote blockquote {
  /* Negate theme styles */
  border: 0;
  margin: 0;
  padding: 0;

  background: none;
  color: gray;
  font-family: Georgia, serif;
  font-size: 1.8rem;
  font-style: italic;
  line-height: 1.4 !important;
  margin: 0;
  position: relative;
  text-shadow: 0 1px white;
  z-index: 600;
}

.testimonial-quote blockquote * {
  box-sizing: border-box;
}

.testimonial-quote blockquote p {
  color: #75808a;
  line-height: 1.4 !important;
}

.testimonial-quote blockquote p:first-child:before {
  content: "\201C";
  color: #81bedb;
  font-size: 6.5em;
  font-weight: 700;
  opacity: 0.3;
  position: absolute;
  top: -0.4em;
  left: -0.2em;
  text-shadow: none;
  z-index: -300;
}

.testimonial-quote img {
  border: 3px solid #9cc1d3;
  border-radius: 50%;
  display: block;
  width: 60px;
  min-height: 60px;
  position: absolute;
  top: -0.2em;
  left: 0;
}

.testimonial-quote cite {
  color: gray;
  display: block;
  font-size: 0.8em;
}

.testimonial-quote cite span {
  color: #5e5e5e;
  font-size: 1em;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 1px white;
}

.testimonial-quote {
  position: relative;
}

.testimonial-quote .quote-container {
  padding-left: 100px;
}

.getAll {
  font-size: 1.1rem;
  font-weight: 400;
  color: #5e5e5e;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 3px;
}
</style>
