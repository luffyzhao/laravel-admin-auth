import {reactive, watch} from 'vue'
import {$cache} from '@/plugins/cache'
import router from "@/router";

const config = {
    use: 'local'
};

const defaultFn = {
    "$store/common/collapsible": $cache.get("$store/common/collapsible", config) || false,
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
        if (newvalue === null && oldvalueKey === "$store/auth/token") {
            $cache.clear();
            reset();
            router.push({name: 'login'})
        } else {
            router.push({name: 'home'})
        }
    }, {
        deep: true
    })
}


export const local = defaultState;