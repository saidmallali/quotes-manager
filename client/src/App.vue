<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <router-view :key="$route.path" v-show="showPage" @ready="pageReady" />
      <AppSpinner v-show="!showPage" />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
import AppSpinner from "@/components/layout/AppSpinner";
export default {
  components: {
    NavBar,
    AppSpinner
  },
  data() {
    return {
      showPage: false
    };
  },
  methods: {
    pageReady() {
      this.showPage = true;
    }
  },
  created() {
    this.$store.dispatch("auth/autoLogin").then(() => {
      const redirectTo = this.$route.query.redirectTo || { name: "home" };
      this.$router.push(redirectTo);
    });
  }
};
</script>

<style>
@import "assets/css/style.css";
</style>
