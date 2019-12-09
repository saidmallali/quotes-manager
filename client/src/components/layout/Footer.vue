<template>
  <div class="footer" v-if="footer">
    <div class="droit-Auteur"></div>
    <div class="box-defilment">
      <p>
        Copyright &copy; 2019
        <span>Said Labriki</span>
      </p>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["footer"])
  }
};
</script>

<style lang="scss">
.footer {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (min-width: 960px) {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .box-defilment {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: 12%;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    line-height: 14px;
    background-color: #000000;
    opacity: 0.8;
    color: #ffffff;
    width: 30%;
    height: 100%;
  }
}
</style>