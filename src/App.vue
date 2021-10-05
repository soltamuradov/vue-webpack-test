<template>
<div class="app">
  <form @submit.prevent>
      <input class="input"
             type="text"
             v-model="login"
      >
      <button class="btn" @click="clickSearchUser">Найти</button>
  </form>

  <div class="content__users" >
    <div class="block__users" v-for="user in users">
      <div>
        <img class="img__user" :src="user.avatar_url">
      </div>
      <h4 class="login__user">{{user.login}}</h4>
    </div>

  </div>
</div>
</template>

<script>
import axios from "axios"
export default {
  name: "App.vue",
  data() {
    return {
      users: [],
      login: ""
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get(`https://api.github.com/search/users?q=${this.login}`)
        this.users = res.data.items
        console.log(res)
      }catch (e) {
        console.log("Ошибка получения данных")
      }
    },
    clickSearchUser() {
      this.fetchUsers()
      // this.login = ""
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
.app {
  width: 900px;
  margin: auto;
}

.input {
  border: 2px solid teal;
  width: 100%;
  height: 25px;
  border-radius: 5px;
}
.btn {
  margin-top: 10px;
  background: none;
  border: 2px solid teal;
  align-self: flex-end;
  width: 70px;
  height: 30px;
  border-radius: 5px;
}
form {
  display: flex;
  flex-direction: column;
}

.content__users{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
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