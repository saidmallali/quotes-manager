<template>
  <div id="formQuote">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea name id cols="30" rows="5" class="form-input" v-model="editeQuote.quote"></textarea>
      </div>
      <div class="form-group">
        <input
          type="radio"
          name="statu"
          value="private"
          v-model="editeQuoteStatu.statu"
          :checked="editeQuote.statu === 'private'"
        /> private
        <input
          type="radio"
          name="statu"
          value="public"
          v-model="editeQuoteStatu.statu"
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
      return this.$store.getters["quotes/getIsUpdate"];
    },

    editeQuote: {
      get() {
        return this.$store.getters["quotes/getEditQuote"];
      },
      set(value) {
        this.$store.dispatch("quotes/setEditeQuote", value);
      }
    },
    editeQuoteStatu: {
      get() {
        return this.$store.getters["quotes/getEditQuote"];
      },
      set(value) {
        this.$store.dispatch("quotes/setEditeQuoteStatu", value);
      }
    }
  },

  methods: {
    save() {
      const quote = this.editeQuote;
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
