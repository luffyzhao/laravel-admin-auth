import {$cache} from '@/plugins/cache'

export default {
    name: 'remote',
    props: {
        modelValue: {
            type: [Number, String],
            default: ''
        },
        url: {
            type: String,
            required: true,
            default: ''
        },
        showCode: {
            type: Boolean,
            default: false
        },
        cache: {
            type: Boolean,
            default: false
        },
        baseURL: {
            type: String,
            default: '/api/'
        }
    },
    data() {
        return {
            lists: []
        }
    },
    computed: {
        defaultValue() {
            const modelValue = this.modelValue;
            let value = '';
            this.lists.forEach((val) => {
                if (val.code === modelValue) {
                    value = this.showCode ? `${val.code} - ${val.name}` : val.name;
                }
            });
            return value;
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        urlData() {
            return this.$http.get(this.url, {
                method: 'get',
                baseURL: this.baseURL
            });
        },
        setData(res) {
            this.lists = res;
            this.loading = false;
            $cache.set(this.url, res);
            $cache.set(`remote:` + this.url, false);
        },
        getData() {
            let remote = $cache.get(`remote:` + this.url) || false;
            let list = $cache.get(this.url) || [];
            if (list.length > 0) {
                this.setData(list)
            }else{
                if(remote === true){
                    setTimeout(() => {
                        this.getData();
                    }, 1000);
                }else{
                    $cache.set(`remote:` + this.url, true);
                    this.getRequest();
                }
            }

        },
        getRequest(){
            this.getUrl().then(res => {
                this.setData(res)
            });
        },
        getUrl() {
            return this.urlData();
        }
    }
}
