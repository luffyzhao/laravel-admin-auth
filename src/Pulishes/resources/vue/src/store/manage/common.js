import {$cache} from '../../plugins/cache';
import router from "../../router/manage";

let state = {
    token: null,
    menus: [],
    usedRouter: []
};

let mutations = {
    setToken(state, token) {
        state.token = token;
        $cache.set('$store/auth/token', token);
        router.push({name: 'home'});
    },
    setMenus(state, menus) {
        state.menus = menus;
        $cache.set('$store/auth/menus', menus);
    },
    setRouter(state, {name, meta}) {
        if (meta && meta.history) {
            let index = state.usedRouter.findIndex((val) => val.name === name);
            if (index !== -1) {
                state.usedRouter.splice(index, 1);
            }
            state.usedRouter.unshift({name, meta});
            $cache.set('$store/auth/usedRouter', state.usedRouter);
        }
    }
};

state.token = $cache.get('$store/auth/token') || null;
state.menus = $cache.get('$store/auth/menus') || [];
state.usedRouter = $cache.get('$store/auth/usedRouter') || [];

export default {
    namespaced: true,
    state,
    mutations
}