<template>
    <div class="block__users" v-for="user in users" :key="user.id">
      <div>
        <img class="img__user" :src="user.avatar_url">
      </div>
      <router-link :to="`/user/${user.login}`">
      <h4 @click="$router.push(`/user/${user.login}`); setUserLogin(user.login)" class="login__user">{{user.login}}</h4>
      </router-link>
    </div>

</template>

<script>
import { mapMutations, mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      users: state => state.users,
      login: state => state.login
    }),
  },
  methods: {
    ...mapMutations({
      setUserLogin: 'setUserLogin'
    })
    },
}
</script>