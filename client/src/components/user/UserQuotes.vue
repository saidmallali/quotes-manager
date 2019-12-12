<template>
  <div class="col-7 push-top">
    <div id="userQuotes">
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
        <Pagination :user="true" />
      </div>
    </div>
  </div>
</template>
<script>
import UserQuotesItems from "./UserQuotesItems";
import QuoteEditor from "@/components/quotes/QuoteEditor";
import SearchQuote from "@/components/quotes/SearchQuote";
import Pagination from "@/components/quotes/Pagination";

export default {
  name: "UserQuotes",
  components: {
    UserQuotesItems,
    QuoteEditor,
    SearchQuote,
    Pagination
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
