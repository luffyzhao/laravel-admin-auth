<template>
    <i-modal :loading="loading" v-model="defaultValue" title="产品列表" :width="1200" >
        <div style="height: 300px;display: flex;flex-flow: column;overflow: hidden;">
        <i-search v-model="search">
            <FormItem label="产品代码">
                <Input v-model="search.code" placeholder="产品代码" size="small"></Input>
            </FormItem>
            <FormItem label="产品品牌">
                <Input v-model="search.brand" placeholder="产品品牌" size="small"></Input>
            </FormItem>
            <FormItem :label-width="1">
                <Button type="primary" icon="ios-search" @click="getLists(1)" size="small">搜索</Button>
            </FormItem>
        </i-search>
        <i-table :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange">
            <template slot-scope="{ row, index }" slot="action">
                <span v-if="isChoose(row)">已选取</span>
                <Button size="small" @click="choose(row)" v-else>选取</button>
            </template>
        </i-table>
        </div>
    </i-modal>
</template>

<script>
    import IModal from "../content/modal";
    import ISearch from "../content/search";
    import ITable from "../content/table";
    import contentListPage from "../../mixins/contentListPage";
    import contentDrawer from '../../mixins/contentDrawer';

    export default {
        name: "choose-product-list",
        components: {ITable, ISearch, IModal},
        mixins: [contentListPage, contentDrawer],
        props: {
            customer: {
                required: true
            }
        },
        data(){
            return {
                loading: false,
                search: {},
                table: {
                    columns: [{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },{
                        title: '产品代码',
                        key: 'code',
                        width: 200
                    },{
                        title: '商品名称',
                        key: 'title'
                    },{
                        title: '商品品牌',
                        key: 'brand',
                        width: 120
                    },{
                        title: '操作',
                        slot: 'action',
                        width: 170
                    }],
                }
            }
        },
        methods:{
            getLists(page){
                this.loading = true;
                this.$http.get(`product/index`, {
                    params: Object.assign({
                        customer_id: this.customer
                    }, this.search, {page: page})
                }).then((data) => {
                    this.table.data = data.data
                    this.page.total = data.total
                    this.page.current = data.current_page
                }).finally(() => {
                    this.loading = false;
                });
            },
            choose(row){
                this.$emit('on-product-choose', row);
            },
            isChoose(row){
                return this.props.findIndex((val) => val.product.code === row.code) !== -1;
            }
        }
    }
</script>

<style scoped>

</style>
