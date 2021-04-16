export default {
    name: 'ISubmitMixins',
    data() {
        return {
            loading: false
        }
    },
    methods: {
        validate(name) {
            return new Promise((resolve, reject) => {
                this.$refs[name].validate((valid) => {
                    valid ? resolve() : reject();
                });
            });
        },
        _lists(url, page) {
            this.loading = true;
            this.$http.get(url, {
                params: Object.assign({}, this.search, {page: page, per_page: this.page.per_page})
            }).then((data) => {
                this.table.data = data.data;
                this.page.total = data.total;
                this.page.current = data.current_page;
            }).finally(() => {
                this.loading = false;
            });
        },
        _confirm(render = (h) => {
            return h('p', '该操作是不可逆，确认进行这个操作吗？')
        }) {
            return new Promise((resolve, reject) => {
                this.$Modal.confirm({
                    loading: this.loading,
                    title: '警告',
                    render,
                    className: 'ivu-modal-wrap',
                    lockScroll: true,
                    onOk: () => {
                        resolve();
                    }
                });
            });
        },
        _download(url, file = '下载的文件.txt'){
            let filename = this.getFileName(url);
            this.$http.download(`common/download`, {url}).then((res) => {
                let url = window.URL.createObjectURL(new Blob([res]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            });
        },
        getFileName (o) {
            let pos = o.lastIndexOf('/');
            return o.substring(pos + 1);
        }
    }
}
