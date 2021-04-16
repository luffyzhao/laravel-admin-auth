export default {
    name: 'iJson',
    props: {
        value: {
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
        }
    },
    data() {
        return {
            lists: []
        }
    },
    computed: {
        defaultValue() {
            let value = '';
            this.lists.forEach((val) => {
                if (val.code === this.value) {
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
                baseURL: '/api/'
            });
        },
        setData(res) {
            this.lists = res;
            this.loading = false;
            this.$cache.set(this.url, res);
        },
        getData() {
            let list = this.$cache.get(this.url) || [];
            let remote = this.$cache.get(`remote:` + this.url) || false;
            if (list.length === 0 && remote === false) {
                this.$cache.set(`remote:` + this.url, true);
                this.urlData().then(res => {
                    this.setData(res)
                }).finally(() => {
                    this.$cache.set(`remote:` + this.url, false);
                });
            } else if (remote === true) {
                setTimeout(() => {
                    this.getData();
                }, 1000);
            } else {
                this.setData(list)
            }
        }
    }
}
