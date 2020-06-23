<template>
    <i-content :spinShow="loading">
        <i-search v-model="search">
            <FormItem label="权限名称">
                <Input v-model="search.name" placeholder="权限名称" size="small"></Input>
            </FormItem>
            <FormItem label="请求URI">
                <Input v-model="search.uri" placeholder="URI" size="small"></Input>
            </FormItem>
            <FormItem :label-width="1">
                <Button type="primary" icon="ios-search" @click="getLists(1)" size="small">搜索</Button>
                <Button type="success" icon="ios-add" @click="routerPush('authorities.authority.create')" size="small">
                    添加
                </Button>
            </FormItem>
        </i-search>

        <i-table :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange">
            <template slot-scope="{ row, index }" slot="status">
                <Tag v-if="row.status === 0">草稿</Tag>
                <Tag v-if="row.status === 1">申报中</Tag>
                <Tag v-else-if="row.status === 2">待收货</Tag>
                <Tag v-else-if="row.status === 3">待上架</Tag>
                <Tag v-else>完成</Tag>
            </template>
            <template slot-scope="{ row, index }" slot="customer">
                <span>{{ row.customer.name }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button size="small">
                    查看
                </Button>
            </template>
        </i-table>
    </i-content>
</template>

<script>
    import IContent from "../../../components/content/index";
    import ISearch from "../../../components/content/search";
    import ITable from "../../../components/content/table";
    import contentListPage from "../../../mixins/content-list-page";

    export default {
        name: "index",
        mixins: [contentListPage],
        components: {ITable, ISearch, IContent},
        data() {
            return {
                table: {
                    columns: [
                        {
                            title: '入库单号',
                            key: 'code'
                        },
                        {
                            title: '参考号',
                            key: 'reference_no'
                        },
                        {
                            title: '客户名称',
                            slot: 'customer'
                        },
                        {
                            title: '件数',
                            key: 'piece',
                            width: 100
                        }, {
                            title: '毛重(kg)',
                            key: 'weight',
                            width: 100
                        },
                        {
                            title: '创建时间',
                            key: 'created_at',
                            width: 200
                        },
                        {
                            title: '状态',
                            slot: 'status',
                            width: 100
                        },
                        {
                            title: '操作',
                            slot: 'action',
                            width: 200
                        }
                    ]
                },
                search: {}
            }
        },
        methods: {
            getLists(page = 1) {
                this.loading = true;
                this.$http.get(`receiving/list`, {
                    params: Object.assign({}, this.search, {page: page})
                }).then((data) => {
                    this.table.data = data.data
                    this.page.total = data.total
                    this.page.current = data.current_page
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>
