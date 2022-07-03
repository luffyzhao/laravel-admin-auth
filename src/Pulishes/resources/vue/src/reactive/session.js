import {reactive, watch} from 'vue'
import router from "@/router";
import {$cache} from '@/plugins/cache'

const config = {
    use: 'session'
};
const defaultFn = {
    "$store/auth/token": $cache.get("$store/auth/token", config) || null,
    "$store/auth/menu": $cache.get("$store/auth/menu", config) || null,
    "$store/common/router": $cache.get("$store/common/router", config) || [],
    "$store/common/isCollapsed": $cache.get("$store/common/isCollapsed", config) || false,
}

let defaultState = reactive(defaultFn);

const reset = () => {
    for (const argumentsKey in defaultState) {
        defaultState[argumentsKey] = defaultFn[argumentsKey];
    }
}

for (const oldvalueKey in defaultState) {
    watch(() => defaultState[oldvalueKey], (newvalue) => {
        $cache.set(oldvalueKey, newvalue, config)
    }, {
        deep: true
    })
}

export const session = defaultState;
