import ISubmit from './iSubmitMixins'
import IComponent from "./iComponentMixins";

export default {
    mixins: [ISubmit, IComponent],
    name: 'IContentMixins',
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
            loading: true,
            search: {}
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getLists();
        });
    },
    methods: {
        pageChange(v) {
            this.page.per_page = v.per_page;
            this.getLists(v.page);
        },
        getLists() {
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
        }
    }
}
