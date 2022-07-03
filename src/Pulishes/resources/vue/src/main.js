import { createApp } from 'vue'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import router from "@/router";
import http from "@/plugins/http";
import unit from "@/plugins/unit";
import 'view-ui-plus/dist/styles/viewuiplus.css'
import '@/assets/app.less'

createApp(App)
    .use(ViewUIPlus)
    .use(http)
    .use(unit)
    .use(router)
    .mount('#app')
