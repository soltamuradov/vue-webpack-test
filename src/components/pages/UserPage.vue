<template>
  <div class="user__page">
    <div class="user__block">
      <div class="img__block">
        <img  class="img" :src="user.avatar_url">
      </div>
      <div class="text__info">
        <h2 class="text">{{user.name}}</h2>
        <h3 class="text">{{user.location}}</h3>
        <span class="text">подписчики: <strong>{{user.followers}}</strong> подписки: <strong>{{user.following}}</strong></span>
      </div>

    </div>
    <div class="repos">
      <h2>Репозитории:</h2>
      <div class="repos__rep" v-for="rep in repos">
        <h3 class="text">{{rep.full_name}}</h3>
        <span class="text">
          Язык:<strong> {{ rep.language }} </strong>
           | Обновлен: {{dayjs(rep.updated_at).format("YYYY-MM-DD HH:mm") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"
import dayjs from "dayjs";
export default {
  data() {
    return {
      dayjs
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      repos: state => state.repos
    })
  },
  methods: {
    ...mapActions({
      getUserByLogin: "getUserByLogin",
      fetchUserRepos: "fetchUserRepos"
    }),

  },
  mounted() {
    this.getUserByLogin()
    this.fetchUserRepos()
  }
}
</script>