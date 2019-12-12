<template>
  <div id="dashboard">
    <AppSpinner v-if="!(user && userQuotes)" />
    <div v-if="user && userQuotes" class="flex-grid">
      <UserProfileCard :user="user" :Nquotes="userQuotes.length" />
      <UserQuotes :user="user" :userQuotes="userQuotes" />
    </div>
  </div>
</template>
<script>
import UserProfileCard from "@/components/user/UserProfileCard";
import UserQuotes from "@/components/user/UserQuotes";
import AppSpinner from "@/components/layout/AppSpinner";

export default {
  data() {
    return {};
  },
  components: {
    UserProfileCard,
    UserQuotes,
    AppSpinner
  },
  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
    userQuotes() {
      return this.$store.getters["quotes/getUserQuotes"];
    }
  },

  created() {
    this.$store
      .dispatch("auth/fetchUser")
      .then(() => {
        this.$emit("ready");
      })
      .catch(err => console.error(err.message));
    this.$store.dispatch("quotes/fetchUserQuotes", {
      page: 1,
      limit: 5
    });
  }
};
</script>
<style lang="scss">
#dashboard {
  width: 100%;
}
</style>