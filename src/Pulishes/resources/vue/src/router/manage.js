import Vue from 'vue'
import VueRouter from 'vue-router'
import $common from '../store/manage';
import {common} from './manage/common';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('../views/Layout.vue'),
        children: [
            ...common,
            {
                path: 'layout-404',
                name: 'layout-404',
                component: () => import('../views/manage/error/layout-404.vue'),
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/manage/error/404.vue'),
    }
];

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    let isLogin = Boolean($common.state.common.token);
    if (!Boolean(to.name) && isLogin) {
        next({name: 'layout-404'})
    } else if (!Boolean(to.name) && !isLogin) {
        next({name: '404'})
    } else {
        if (to.name === 'login' && isLogin) {
            next({name: 'home'})
        } else if (to.name !== 'login' && !isLogin) {
            next({name: 'login'})
        } else {
            $common.commit('common/setRouter', to);
            next()
        }
    }
});

export default router
