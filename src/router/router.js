import { createRouter, createWebHistory} from "vue-router";
import Main from "../components/pages/Main";
import UserPage from "../components/pages/UserPage";


const routes = [
    {
        path: "/",
        component: Main
    },
    {
        path: "/users",
        component: UserPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router