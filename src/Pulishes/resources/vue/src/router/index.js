import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './manage/routes'
import $common from '../store/index';


let father = {
    path: '/',
    name: 'layout',
    component: () => import('../views/Layout.vue'),
    children: [
        {
            path: 'layout-404',
            name: 'layout-404',
            component: () => import(`../views/error/layout-404.vue`),
        }
    ]
};

Vue.use(VueRouter);

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes
});

const modules = document.head.querySelector("[property~='og:modules'][content]").content || null;
let common = import(`./${modules}/index.js`);

/**
 *
 * @returns {string}
 * @constructor
 */
function GetRequest() {
    let str = location.href;
    let num = str.indexOf("#");
    str = str.substr(num + 1);
    return str;
}

const href = GetRequest();



common.then((res, index) => {
    for (let key in res.default){
        res.default[key].forEach((i) => {
            father.children.push(i);
        })
    }
    router.addRoutes([father]);
}).finally(() => {
    router.push({
        path: href
    });
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
