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
    console.log(this.repos)
  }
}
</script>

<style scoped>
.user__block{
  margin-top: 20px;
  display: flex;
}
.text {
  margin: 10px 0 10px 10px;
  padding: 0;
}
.img__block{
  width: 200px;
  margin-right: 20px;
}
.img{
  width: 100%;
  border-radius: 20px;
}
.repos__rep{
  border: 1px solid teal;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
forks_count: 0