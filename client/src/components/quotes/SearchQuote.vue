<template>
  <div id="search">
    <div class="searchBar">
      <form @submit.prevent="search">
        <input
          type="text"
          class="searchTerm"
          v-model="text"
          placeholder="find quotes by keyword, author"
        />
        <button type="submit" class="searchButton">
          <font-awesome-icon icon="search" />
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "search",
  props: {
    user: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      text: ""
    };
  },
  validations: {
    text: {
      required,
      minLength: minLength(3)
    }
  },

  methods: {
    search() {
      if (!this.$v.text.$invalid) {
        if (this.user) {
          this.$store
            .dispatch("quotes/searchQuoteUser", this.text)
            .then(() => (this.text = ""));
        } else {
          console.log(this.text);
          this.$store
            .dispatch("quotes/searchQuote", this.text)
            .then(() => (this.text = ""));
        }
      }
    }
  }
};
</script>
<style lang="scss">
/*Resize the wrap to see the search bar change!*/
#search {
  width: 30%;

  .searchBar {
    width: 100%;

    form {
      display: flex;
      height: 30px;

      .searchTerm {
        width: 100%;
        border: 1px solid #00b4cc;
        border-right: none;
        padding: 5px;
        border-radius: 3px 0 0 3px;
        outline: none;
        color: #9dbfaf;
        &:focus {
          color: #00b4cc;
        }
      }

      .searchButton {
        width: 40px;
        height: 30px;
        border: 1px solid #00b4cc;
        background: #00b4cc;
        text-align: center;
        color: #fff;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
        font-size: 20px;
      }
    }
  }
}
</style>
