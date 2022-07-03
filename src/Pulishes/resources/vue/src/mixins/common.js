import {h, markRaw} from "vue";

export default {
    name: 'CommonMixin',
    props: {
        props: {
            type: Object
        }
    },
    data() {
        return {
            show: true,
            component: {
                render: null,
                props: {},
            },
            table: {
                search: {},
                loading: false,
                columns: [],
                data: [],
                page: {
                    total: 0,
                    page: 1,
                    "page-size": 30
                }
            }
        }
    },
    methods: {
        /**
         * 打开下拉
         * @param render
         * @param props
         */
        openComponent(render, props = {}) {
            this.component.render = null;
            this.component.render = markRaw(render);
            this.component.props = props;
        },
        /**
         * 打开弹窗
         * @param render
         * @param props
         */
        openComponentModal(render, props = {}) {
            this.component.renderModal = null;
            this.component.renderModal = markRaw(render);
            this.component.propsModal = props;
        },
        /**
         * table 列表赋值
         * @param data
         * @param current_page
         * @param total
         * @param per_page
         */
        assignmentTable({data, current_page, total, per_page}) {
            this.table.data = data;
            this.table.page = {
                total, page:current_page, "page-size": parseInt(per_page)
            }
        },
        /**
         * 列表页面刷新
         * @param url
         * @param page
         */
        handleRefresh(url, page){
            this.table.loading = true;
            this.$http.get(url, {
                params: Object.assign({}, this.table.search, this.table.page)
            }).then((res) => {
                this.assignmentTable(res);
            }).finally(() => {
                this.table.loading = false;
            });
        },
        /**
         * 表单验证
         * @param name
         */
        validate(name){
            return new Promise((resolve, reject) => {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        resolve(valid)
                    } else {
                        reject(valid);
                    }
                })
            });
        },
        /**
         * table选中的行
         *  @param name
         */
        getSelection(name){
            return new Promise((resolve, reject) => {
                let selection = this.$refs[name].$refs.table.getSelection();

                if(selection.length === 0){
                    this.$Message.error('没有选中任何数据');
                    reject();
                }else{
                    resolve(selection)
                }
            })

        },
        /**
         * table选中的行 （单 行）
         * @param name
         * @returns {Promise<unknown>}
         */
        getSelectionOne(name){
            return new Promise((resolve, reject) => {
                this.getSelection(name).then((res) => {
                    if(res.length === 1){
                        resolve(res[0])
                    }else{
                        this.$Message.error('该操作只能选中一行数据');
                        reject();
                    }
                }).catch(() => {});
            });
        },
        /**
         * 确认框
         */
        confirm(config = {}){
            return (new Promise((resolve, reject) => {
                config = Object.assign({
                    render: (h) => {
                        return h('span', '确认进行这个操作吗？');
                    },
                    "lock-scroll" : true
                }, config);
                config.onOk = (res) => {
                    resolve(res);
                }
                this.$Modal.confirm(config)
            })).catch(() => {})
        }
    }
}
