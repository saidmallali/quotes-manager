<template>
  <div>
    <div class="col-4 push-top">
      <div class="profile-card">
        <p class="text-center">
          <img :src="user.avatar ? user.avatar : defaultAvatar" alt class="avatar-xlarge" />
        </p>

        <h1 class="title">{{ user.username }}</h1>

        <p class="text-lead">{{ user.name }}</p>

        <div class="stats">
          <span>{{Nquotes}} Quotes</span>
        </div>
      </div>

      <p class="text-xsmall text-faded text-center">Member since {{ user.date }}</p>

      <!-- <div class="text-center">
        <hr />
        <a href="edit-profile.html" class="btn-green btn-small">Edit Profile</a>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  name: "UserProfileCard",
  data() {
    return {
      defaultAvatar:
        "https://icon-library.net/images/avatars-icon/avatars-icon-16.jpg"
    };
  },
  props: {
    user: {
      required: true,
      type: Object
    },
    Nquotes: {
      required: true,
      type: Number
    }
  }
};
</script>
