<template>
  <div id="navbar">
    <header>
      <nav class="nav">
        <div class="brand">
          <router-link :to="{ name: 'Home' }">Qoutes manager</router-link>
        </div>
        <div class="nav-descktop">
          <div class="nav-part_left">
            <ul class="list-items-left">
              <li>
                <router-link :to="{ name: 'home' }">Home</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'about' }">ABOUT</router-link>
              </li>
              <li>
                <router-link v-show="auth" :to="{ name: 'dashboard' }"
                  >Dashboard</router-link
                >
              </li>
            </ul>
          </div>
          <div class="separatour"></div>
          <div class="nav-part_right">
            <ul class="list-items-right">
              <li>
                <router-link v-show="auth" :to="{ name: 'logout' }"
                  >LOGOUT</router-link
                >
              </li>
              <li>
                <router-link v-show="!auth" :to="{ name: 'login' }"
                  >LOGIN</router-link
                >
              </li>
              <li>
                <router-link v-show="!auth" :to="{ name: 'register' }"
                  >REGISTER</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
// import { mapMutations, mapState } from "vuex";
export default {
  name: "NavBar",

  data() {
    return {};
  },

  computed: {
    auth() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  }
};
</script>

<style lang="scss">
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 75px;
  background-color: #fff;
  z-index: 999;
  /* border-bottom:1px solid #333; */
  -webkit-box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.33);
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.33);

  .nav {
    width: 95%;
    height: 100%;
    margin-left: 2.5%;
    margin-right: 2.5%;

    display: flex;
    align-items: center;
    justify-content: center;

    .brand {
      min-width: 100px;
      font-size: 2rem;
    }

    .nav-descktop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: calc(100% - 60px);
      height: 100%;
      font-weight: 500;
      font-size: 1.4rem;
      letter-spacing: 1px;

      .nav-part_left {
        width: 50%;
        position: relative;
        height: 100%;

        .list-items-left {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;

          li {
            display: inline-block;
            margin-left: 2%;
            a {
              margin-left: 5px;
              /* font-size:1.4em; */
              /* letter-spacing:1px; */
              cursor: pointer;
              &:hover {
                color: rgb(4, 169, 211);
              }
              &.router-link-exact-active {
                color: rgb(4, 169, 211);
              }
            }
          }
        }
      }

      .nav-part_right {
        width: 20%;
        .list-items-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;

          li {
            display: inline-block;
            margin-left: 2%;

            a {
              margin-left: 5px;
              /* font-size:1.4em; */
              /* letter-spacing:1px; */
              cursor: pointer;

              &:hover {
                color: rgb(4, 169, 211);
              }
              &.router-link-exact-active {
                color: rgb(4, 169, 211);
              }
            }
          }
        }
      }
      .separatour {
        flex: 1;
      }
    }
  }
}
</style>
