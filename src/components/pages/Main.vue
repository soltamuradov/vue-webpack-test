<template>
  <div>
    <h1 class="title">Поиск программистов в GitHub</h1>

    <form @submit.prevent>
      <my-input class="input"
                type="text"
                :model-value="login"
                @update:model-value="setLogin"
      />
      <button
          class="btn"
          @click="clickSearchUser"
      >
        Найти
      </button>
    </form>

    <sort-users
        v-model="selectedSort"
        :options="sortOptions"
    />

    <div class="content__users" >
      <users-list :users="users"/>
    </div>

    <div
        ref="observer"
        class="observer"
    ></div>
  </div>
</template>

<script>
import SortUsers from "../SortUsers";
import UsersList from "../UsersList";
import {mapState, mapMutations, mapActions} from "vuex"
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
      setSelectedSort: "setSelectedSort"
    }),
    clickSearchUser() {
      this.fetchUsers()
    }
  },
  mounted() {
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
  watch: {
    selectedSort(newValue) {
      if (newValue !== ""){
        this.clickSearchUser()
      }
    }
  }
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
.observer {
  height: 30px;
}

</style>