import {common} from "./common";

export const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('../../views/Layout.vue'),
        redirect: 'home',
        children: [
            ...common
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../../views/error/404.vue'),
    },{
        path: '/login',
        name: 'login',
        component: () => import('../../views/manage/login/index.vue')
    }
];
