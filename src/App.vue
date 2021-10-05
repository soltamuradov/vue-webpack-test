<template>
<div class="app">
  <h1 class="title">Поиск программистов в GitHub</h1>
  <form @submit.prevent>
      <input class="input"
             type="text"
             v-model="login"
      >
      <button class="btn" @click="clickSearchUser">Найти</button>
  </form>

  <sort-users v-model="selectedSort" :options="sortOptions"/>

  <div class="content__users" >
    <users-list :users="users"/>
  </div>
</div>
</template>

<script>
import UsersList from "./components/UsersList";
import axios from "axios"
import SortUsers from "./components/SortUsers";
export default {
  name: "App.vue",
  components: {SortUsers, UsersList},
  data() {
    return {
      users: [],
      login: "",
      selectedSort: "",
      sortOptions: [
        {value: "login", name: "По названию"},
      ]
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get(`https://api.github.com/search/users?q=${this.login}`)
        this.users = res.data.items
      }catch (e) {
        console.log("Ошибка получения данных")
      }
    },
    clickSearchUser() {
      this.fetchUsers()
      this.login = ""
    }
  },
  mounted() {
    // this.fetchUsers()
  },
  watch: {
    selectedSort(newValue) {
      this.users.sort((user1, user2) => {
        return user1[newValue]?.localeCompare(user2[newValue])
      })
    }
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
.title {
  text-align: center;
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

</style>