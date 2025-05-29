import {createRouter, createWebHashHistory} from 'vue-router';
import AllSettings from "@/modules/settings/AllSettings";
import SinglePageLayout from "@/components/SinglePageLayout";

const routes = [

    {
        path: '/',
        name: 'Settings',
        redirect: '/settings',
        component:SinglePageLayout,
        meta: { requireAuth:true },
        children: [

            {
                path:'/settings',
                name:'Settings',
                meta:{title: "Settings"},
                component: AllSettings
            } ,


        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: "apbd-active",
    linkExactActiveClass: "apbd-exact-active",
})

export default router
