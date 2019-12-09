<template>
  <div id="formQuote">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea name id cols="30" rows="5" class="form-input" v-model="text"></textarea>
      </div>
      <div class="form-group">
        <input
          type="radio"
          name="statu"
          value="private"
          v-model="statu"
          :checked="editeQuote.statu === 'private'"
        /> private
        <input
          type="radio"
          name="statu"
          value="public"
          v-model="statu"
          :checked="editeQuote.statu === 'public'"
        /> public
      </div>
      <div class="form-actions">
        <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-small">Cancel</button>
        <button class="btn-blue btn-small">{{isUpdate ? 'Update' : 'Submit Quote'}}</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      statu: "public"
    };
  },

  computed: {
    isUpdate() {
      // return this.$store.quotes.state.isUpdate;
      return this.$store.getters["quotes/getIsUpdate"];
    },

    editeQuote() {
      // return this.$store.quotes.state.EditQuote;
      return this.$store.getters["quotes/getEditQuote"];
    }
  },

  methods: {
    save() {
      const quote = {
        quote: this.text,
        statu: this.statu
      };
      if (this.isUpdate) {
        this.$store
          .dispatch("quotes/updateQuote", quote)
          .catch(err => console.error(err.message));
      } else {
        this.$store
          .dispatch("quotes/createQuote", quote)
          .catch(err => console.error(err.message));
      }
    },

    cancel() {
      this.$store
        .dispatch("quotes/cancelUpdate")
        .catch(err => console.error(err.message));
    }
  }
};
</script>
