export default {
    name: 'i-json',
    props: {
        value: {
            type: [Number, String],
            default: ''
        },
        type: {
            type: String,
            default: 'custom'
        },
        url: {
            type: String,
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
        jsonData() {
            try {
                return import(`../../assets/json/${this.type}.json`);
            } catch (e) {
                this.$Notice.error({title: '系统故障', desc: '没有找到相关的json文件', duration: 12});
                throw Error('没有找到相关的json文件');
            }
        },
        urlData() {
            return this.$http.get(this.url);
        },
        setData(res) {
            this.lists = res;
            this.loading = false;
            if (this.type === 'custom') {
                this.$cache.add(this.url, res);
            }
        },
        getData(){
            if (this.type === 'custom') {
                let list = this.$cache.get(this.url) || [];
                if (list.length === 0) {
                    this.urlData().then(res => {
                        this.setData(res)
                    })
                } else {
                    this.setData(list)
                }

            } else {
                this.jsonData().then(res => {
                    this.setData(res.default)
                });
            }
        }
    },
    watch:{
        url(){
            this.getData();
        }
    }
}
