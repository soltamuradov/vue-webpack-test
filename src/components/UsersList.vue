<template>
    <div class="block__users" v-for="user in users" :key="user.id">
      <div>
        <img class="img__user" :src="user.avatar_url">
      </div>
      <h4 class="login__user">{{user.login}}</h4>
    </div>

</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.block__users {
  width: 250px;
}
.img__user{
  width: 100%;
  border-radius: 10px;
}
.login__user {
  text-align: center;
}
</style>