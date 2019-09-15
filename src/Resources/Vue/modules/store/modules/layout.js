import {$cache} from '../../../plugins/cache'
import {existsRoute} from "../../../libs/util";
import {router} from '../../router/index'

let state = {
    // 活动的标签导航
    active: {},
    // 全部的标签导航
    inactives: []
};

let layout = $cache.get('$store/layout') || {};

state.inactives = layout.inactives || [];
state.active = layout.active || {};

export default {
    namespaced: true,
    state,
    getters: {
        /**
         * 全部的标签导航
         */
        inactives: state => {
            return state.inactives
        },
        /**
         * 活动的标签导航
         */
        active: state => {
            return state.active
        }
    },
    mutations: {
        /**
         * 添加标签导航
         * @param router
         */
        newTag(state, router) {
            if (router.meta.tags === true && state.inactives.findIndex(item =>  existsRoute(item, router)) === -1) {
                let {query,name,params,meta} = router;
                state.inactives.push({
                    query,name,params,meta
                })
            }
        },
        /**
         * 删除某个标签导航
         * @param  state
         * @param  params
         */
        removeTag(state, params) {
            let index = -1;
            if ((index = state.inactives.findIndex(item => existsRoute(item, params))) !== -1) {

                if (index !== 0) {
                    state.inactives.splice(index, 1);
                    if (existsRoute(state.active, params)) {
                        if (index === state.inactives.length) {
                            index = index - 1;
                        }
                        state.active = state.inactives[index]
                    }
                }
            }
            router.push(state.active);
        },
        /**
         * 删除全部标签导航
         * @param {*} state
         */
        removeAll(state) {
            state.inactives.splice(1, state.inactives.length - 1);
            state.active = state.inactives[0]
            router.push(state.active);
        },
        /**
         * 删除其他导航标签
         * @param state
         */
        removeOther(state) {
            state.inactives = state.inactives.filter((router, key) => {
                return key === 0 || existsRoute(state.active, router)
            });
            router.push(state.active);
        },
        /**
         * 设置当前活动的标签导航
         * @param {*} state
         */
        setActive(state, {name, query, params}) {
            state.active = {name, query, params}
        },
        /**
         * 保存到本地数据库
         */
        setLocal(state) {
            $cache.set('$store/layout', state)
        },
        /**
         * 初始设置
         * @param {*} state
         */
        init(state) {
            let $state = $cache.get('$store/layout')
            if ($state.active !== {} && $state.inactives.length > 0) {
                for (const key in $state) {
                    if ($state.hasOwnProperty(key)) {
                        const element = $state[key];
                        state[key] = element
                    }
                }
            }
        }
    },
    actions: {
        /**
         * 打开页面
         * @param {*} param0
         * @param {路由} tag
         */
        open({commit}, tag) {
            commit('newTag', tag);
            commit('setActive', tag);
            commit('setLocal');
        },
        /**
         * 删除页面
         * @param {*} param0
         * @param {*} name
         */
        remove({commit}, name) {
            commit('removeTag', name);
            commit('setLocal')
        },
        /**
         * 删除所有
         * @param {*} param0
         */
        removeAll({commit}) {
            commit('removeAll')
            commit('setLocal')
        },
        /**
         * 删除其他
         * @param {*} param0
         */
        removeOther({commit}) {
            commit('removeOther')
            commit('setLocal')
        },
        /**
         * 初始设置
         * @param {*} param0
         */
        init({commit, state, dispatch}, home) {
            commit('init')
            if (state.active === {}) {
                dispatch('open', home)
            }
        }
    }
}