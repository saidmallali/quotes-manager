<template>
  <div id="userQuotes">
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{ user.name }} recent Quotes</span>
      </div>

      <hr />
      <QuoteEditor />
      <hr />
      <div class="activity-list">
        <div class="col col-7 push-down userSearch">
          <SearchQuote :user="true" />
        </div>
        <UserQuotesItems :userQuotes="userQuotes" />
      </div>
    </div>
  </div>
</template>
<script>
import UserQuotesItems from "./UserQuotesItems";
import QuoteEditor from "@/components/quotes/QuoteEditor";
import SearchQuote from "@/components/quotes/SearchQuote";

export default {
  name: "UserQuotes",
  components: {
    UserQuotesItems,
    QuoteEditor,
    SearchQuote
  },
  props: {
    user: {
      required: true,
      type: Object
    },
    userQuotes: {
      required: true,
      type: Array
    }
  }
};
</script>
<style lang="scss">
</style>
