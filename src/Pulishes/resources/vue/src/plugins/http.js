import axios from 'axios'
import {session} from "@/reactive/session";
import {Notice} from 'view-ui-plus'

let baseUrl = document.head.querySelector("[property~='og:url'][content]").content || null;

const instance = axios.create({
    timeout: 10000,
    baseURL: baseUrl
});

instance.download = (url, data) => {
    return instance.put(url, data, {
        responseType: 'blob',
    });
};
// 添加请求拦截器
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    config.headers = {
        'Accept': 'application/json'
    }
    let $token = session["$store/auth/token"];
    if ($token) {
        config.headers['authorization'] = 'bearer ' + $token;
    }

    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
    // 对响应数据做点什么
    if(Boolean(response.headers.authorization)){

    }
    return response.data;
}, (error) => {
    let desc = '', title = '请求失败';
    if (!error.response) {
        desc = '网络请求失败!';
    } else if(error.response.status === 403){
        title =  error.response.data.message;
        for (const descKey in error.response.data.data) {
            desc += error.response.data.data[descKey].join("<br/>");
        }
    }else{
        desc = error.response.data.message || '服务器错误,请联系管理员!';
    }
    Notice.error({title, desc, duration: 12});
    return Promise.reject(error.response);
});


export default {
    install(Vue) {
        Vue.config.globalProperties.$http = instance;
    }
}

export const $http = instance;
