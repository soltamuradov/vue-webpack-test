<template>
  <div>
    <h1 class="title">Поиск программистов в GitHub</h1>
    <form @submit.prevent>
      <my-input class="input"
                type="text"
                :model-value="login"
                @update:model-value="setLogin"
      />
      <button class="btn" @click="clickSearchUser">Найти</button>
    </form>

    <!--  <sort-users v-model="selectedSort" :options="sortOptions"/>-->

    <div class="content__users" >
      <users-list :users="users"/>
    </div>

    <div ref="observer" class="observer"></div>

    <!--  <div class="pages__navigation">-->
    <!--    <div-->
    <!--        v-for="pageNumber in totalPages"-->
    <!--        :key="pageNumber"-->
    <!--        class="page"-->
    <!--        :class="{-->
    <!--          'current-page': pageL === pageNumber-->
    <!--        }"-->
    <!--        @click="changePage(pageNumber)"-->
    <!--    >-->
    <!--      {{pageNumber}}-->
    <!--    </div>-->
    <!--  </div>-->
  </div>
</template>

<script>

import axios from "axios"
import SortUsers from "../SortUsers";
import UsersList from "../UsersList";
import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
import MyInput from "../UI/Myinput";
export default {
  props: {
    modelValue: [String, Number]
  },
  components: {MyInput, SortUsers, UsersList},
  computed: {
    ...mapState({
      users: state => state.users,
      login: state => state.login,
      selectedSort: state => state.selectedSort,
      pageL: state => state.pageL,
      limit: state => state.limit,
      totalPages: state => state.totalPages,
      sortOptions: state => state.sortOptions
    }),
    ...mapGetters({
      selectedSort: "selectedSort"
    })
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    ...mapActions({
      fetchUsers: "fetchUsers",
      loadMoreUsers: "loadMoreUsers",
    }),
    ...mapMutations({
      setLogin: "setLogin",
      setPageL: "setPageL",
    }),
    clickSearchUser() {
      this.fetchUsers()
      // this.login = ""
    }
  },
  mounted() {
    // if (this.login.length > 0) {
    //this.fetchUsers()
    // }
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if(entries[0].isIntersecting) {
        if (this.login.length > 0){

          this.loadMoreUsers()
        }
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
}
</script>

<style scoped>
.title {
  text-align: center;
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
.pages__navigation {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid teal;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
}

</style>