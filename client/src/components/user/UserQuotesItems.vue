<template>
  <div id="userQuotesItems">
    <div v-for="quote in userQuotes" :key="quote.key" class="activity">
      <div class="activity-header">
        <!-- <img
          src="https://www.sideshowtoy.com/photo_9030371_thumb.jpg"
          alt
          class="hide-mobile avatar-small"
        />-->
        <!-- <p class="title">
                How can I chop onions without crying?
                <span>Joker started a topic in Cooking</span>
        </p>-->
      </div>

      <div class="post-content">
        <div>
          <p>{{ quote.quote }}</p>
        </div>
      </div>

      <div class="thread-details">
        <span>{{ quote.date }}</span>
        <span>{{ quote.like }}</span>
        <span>{{ quote.statu }}</span>
        <button class="btn-green btn-xsmall">edit</button>
        <button class="btn-red btn-xsmall">delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userQuotesItems",

  props: {
    userQuotes: {
      required: true,
      type: Array
    }
  }
};
</script>
