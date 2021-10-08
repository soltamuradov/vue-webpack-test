import {createStore} from "vuex"
import axios from "axios";

export default createStore({
    state: ()=> {
        return {
            users: [],
            login: "",
            selectedSort: "",
            pageL: 1,
            limit: 9,
            totalPages: 0,
            sortOptions: [
                {value: "small", name: "По убыванию"},
                {value: "big", name: "По возрастанию"},
            ]
        }
    },
    // getters: {
    //     selectedSort(state) {
    //         state.users.sort((user1, user2) => {
    //             return user1[state.selectedSort]?.localeCompare(user2[state.selectedSort])
    //         })
    //     }
    // },
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
            }catch (e) {
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
            }catch (e) {
                console.log("Ошибка получения данных")
            }
        },
    },
})