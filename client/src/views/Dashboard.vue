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
      return this.$store.getters["user/getUserQuotes"];
    }
  },

  created() {
    this.$store
      .dispatch("auth/fetchUser")
      .then(() => {
        console.log("fetchUser done");
        this.$emit("ready");
      })
      .catch(err => console.error(err.message));

    this.$store.dispatch("user/fetchUserQuotes");
  }
};
</script>
