<template>
  <div id="userQuotes">
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{ user.name }} recent Quotes</span>
      </div>

      <hr />

      <div class="activity-list">
        <UserQuotesItems :userQuotes="userQuotes" />
      </div>
    </div>
  </div>
</template>
<script>
import UserQuotesItems from "./UserQuotesItems";

export default {
  name: "UserQuotes",
  components: {
    UserQuotesItems
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
