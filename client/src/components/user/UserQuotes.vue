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
        <UserQuotesItems :userQuotes="userQuotes" />
      </div>
    </div>
  </div>
</template>
<script>
import UserQuotesItems from "./UserQuotesItems";
import QuoteEditor from "@/components/quotes/QuoteEditor";

export default {
  name: "UserQuotes",
  components: {
    UserQuotesItems,
    QuoteEditor
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
