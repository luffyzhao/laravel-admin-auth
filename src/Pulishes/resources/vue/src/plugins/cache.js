import Storage from 'storage-web'

const modules = document.head.querySelector("[property~='og:modules'][content]").content || null;

if (modules == null) {
    throw Error(`地址有问题`);
}

Storage.defaults['pre'] = modules;

export default {
    install(Vue) {
        Vue.config.globalProperties.$cache = Storage;
    }
}


export const $cache = Storage;
