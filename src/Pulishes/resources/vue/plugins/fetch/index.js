import axios from 'axios'
import {$cache} from '../cache'
import $store from '../../modules/store/index'
import {Notice} from 'iview'
import {baseUrl} from "../../libs/util";
import FileSaver from 'file-saver';

const instance = axios.create({
    baseURL: baseUrl(),
    timeout: 10000
});

instance.download = (url, data, name = '_文件.xlsx') => {
    return instance.put(url, data ,{
        responseType: 'blob'
    }).then((res) => {
        FileSaver.saveAs(res, name);
    });
};
// 添加请求拦截器
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    config.headers = {
        'Accept': 'application/json'
    }
    let $token = $cache.get('$store/auth/token');
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
    return response.data;
}, (error) => {
    let desc = '';
    if (!error.response) {
        desc = '网络请求失败!';
    } else {
        switch (error.response.status) {
            case 422:
                Object.values(error.response.data.errors).forEach((item) => {
                    desc += item.join('<br />') + '<br />';
                });
                break;
            case 403:
                $store.commit('auth/refresh');
            default:
                desc = error.response.data.message || '服务器错误,请联系管理员!';
                break;
        }
    }
    Notice.error({title: '数据验证错误', desc, duration: 12});
    return Promise.reject(error.response);
});


export default {
    install(Vue) {
        Vue.prototype.$http = instance;
        Vue.http = instance;
    }
}

export const $http = instance;
