<template>
    <i-content :spin-show="loading">
        <i-search v-model="search">
            <FormItem label="部门名称">
                <Input v-model="search.name" placeholder="部门名称" size="small"></Input>
            </FormItem>
            <FormItem :label-width="1">
                <Button type="primary" icon="ios-search" @click="getLists()" size="small">搜索</Button>
                <Button type="success" icon="ios-add" @click="routerPush('authorities.role.create')" size="small">添加</Button>
            </FormItem>
        </i-search>

        <i-table :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange">
                <template slot-scope="{ row, index }" slot="name">
                    <span>{{ row.name }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="description">
                    <span>{{ row.description }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="warning" size="small" @click="routerPush('authorities.role.update', {id: row.id})">编辑</Button>
                    <Poptip
                            confirm
                            title="你确定要删除这个部门吗？"
                            @on-ok="remove(row)">
                        <Button type="error" size="small">删除</Button>
                    </Poptip>
                </template>
        </i-table>
    </i-content>
</template>

<script>
    import IContent from "../../../components/content/index";
    import ISearch from "../../../components/content/search";
    import ITable from "../../../components/content/table";
    import contentListPage from "../../../mixins/contentListPage";
    import Create from "./create"
    import Update from "./update"

    export default {
        name: "index",
        mixins: [contentListPage],
        components: {ITable, ISearch, IContent, Create, Update},
        data() {
            return {
                table: {
                    columns: [
                        {
                            title: '部门',
                            slot: 'name'
                        },
                        {
                            title: '部门描述',
                            slot: 'description'
                        },
                        {
                            title: '操作',
                            slot: 'action'
                        }
                    ]
                },
                search: {},
                loading: false
            }
        },
        methods: {
            getLists(page = 1) {
                this.loading = true;
                this.$http.get(`authorities/role`, {
                    params: Object.assign({}, this.search, {page: page})
                }).then((data) => {
                    this.table.data = data.data
                    this.page.total = data.total
                    this.page.current = data.current_page
                }).finally(() => {
                    this.loading = false;
                });
            },
            remove(data) {
                this.loading = true;
                this.$http.delete(`authorities/role/${data.id}`)
                    .then(() => {
                        this.getLists(this.page.current)
                    });
            }
        }
    }
</script>

<style scoped>

</style>