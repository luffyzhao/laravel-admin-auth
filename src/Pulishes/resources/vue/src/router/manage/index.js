import {common} from "@/router/manage/common";

export const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('../../views/Layout.vue'),
        redirect: '/home',
        children: [
            ...common
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../../components/error/404.vue'),
    },{
        path: '/login',
        name: 'login',
        component: () => import('../../views/manage/login')
    }
];
