import {createStore} from "vuex"
import axios from "axios";

export default createStore({
    state: ()=> {
        return {
            users: [],
            user: {},
            repos: [],
            login: "",
            selectedSort: "",
            userLogin: "",
            pageL: 1,
            limit: 9,
            totalPages: 0,
            sortOptions: [
                {value: "small", name: "По убыванию"},
                {value: "big", name: "По возрастанию"},
            ]
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        setPageL(state, pageL) {
            state.pageL = pageL
        },
        setLogin(state, login) {
            state.login = login
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setUserLogin(state, login) {
            state.userLogin = login
        },
        setUser(state, user) {
            state.user = user
        },
        setRepos(state, repos) {
            state.repos = repos
        }
    },
    actions: {
        async fetchUsers({state, commit}) {
            try {
                const res = await axios.get(`https://api.github.com/search/users?q=${state.login}`, {
                    params: {
                        page: state.pageL,
                        per_page: state.limit,
                        sort: state.selectedSort ? "repositories" : null,
                        order: state.selectedSort === "small" ? "desc" : "asc"
                    }
                })

                commit("setTotalPages", Math.ceil(res.data.total_count / state.limit))
                commit("setUsers", res.data.items)
            } catch (e) {
                console.log(e.message)
            }
        },
        async loadMoreUsers({state, commit}) {
            try {
                commit("setPageL", state.pageL += 1)
                const res = await axios.get(`https://api.github.com/search/users?q=${state.login}`, {
                    params: {
                        page: state.pageL,
                        per_page: state.limit,
                        sort: state.selectedSort ? "repositories" : null,
                        order: state.selectedSort === "small" ? "desc" : "asc"
                    }
                })
                commit("setTotalPages", Math.ceil(res.data.total_count / state.limit))
                commit("setUsers", [...state.users, ...res.data.items])
            } catch (e) {
                console.log("Ошибка получения данных")
            }
        },
        async getUserByLogin({state, commit}) {
            try {
                const res = await axios.get(`https://api.github.com/users/${state.userLogin}`)
                commit("setUser", res.data)
            } catch (e) {
                console.log("Ошибка:" + e.message)
            }
        },
        async fetchUserRepos({state, commit}) {
            try {
                const res = await axios.get(`https://api.github.com/users/${state.userLogin}/repos`)
                commit("setRepos", res.data)
            }catch (e) {
                console.log("Ошибка:" + e.message)
            }
        }
    },
})