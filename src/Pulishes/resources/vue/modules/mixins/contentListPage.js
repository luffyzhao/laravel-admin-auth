import fromSubmit from './fromSubmit'
import component from "./component";

export default {
    mixins: [fromSubmit, component],
    name: 'contentListPage',
    data() {
        return {
            page: {
                current: 1,
                total: 0,
                per_page: 15
            },
            table: {
                columns: [],
                data: [],
                selections: []
            },
            loading: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getLists();
        });
    },
    methods: {
        pageChange(v) {
            this.getLists(v);
        },
        routerPush(name, query = {}) {
            this.$router.push({
                name,
                query
            });
        },
        getLists() {
        },
        onSelectionChange(selection) {
            this.table.selections = selection;
        },
        batchCallback(callback, refresh = true) {
            if (this.table.selections.length === 0) {
                this.$Message.error('没有选择任何数据，请先选择数据！');
            } else {
                this.table.selections.forEach((row) => {
                    this[callback](row);
                });
                refresh && this.getLists();
            }
        }
    }
}
