import {createRouter, createWebHashHistory} from 'vue-router'
import {session} from "@/reactive/session";

const modules = document.head.querySelector("[property~='og:modules'][content]").content || null;
const router = createRouter({
    history: createWebHashHistory(),
    routes: (await import(`./${modules}/index.js`)).routes
});


router.beforeEach((to, from, next) => {
    if (Boolean(session["$store/auth/token"]) && to.name === 'login') {
        next({name: 'home'});
    } else if (!Boolean(session["$store/auth/token"]) && to.name !== 'login') {
        next({name: 'login'});
    } else {
        if (to.name !== 'login') {
            let index = session["$store/common/router"].findIndex((val) => val.name === to.name);
            if (index === -1) {
                session["$store/common/router"].push(JSON.parse(JSON.stringify(to)));
            }
        }
        next();
    }
});

export default router
