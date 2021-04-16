<template>
    <IContent v-model="componentProps">

        <ISearch v-model="search">
            <FormItem label="部门名称">
                <Input v-model="search.name" placeholder="部门名称" size="small"></Input>
            </FormItem>
            <FormItem :label-width="1">
                <ButtonGroup>
                    <Button type="primary" icon="ios-search" size="small">搜索</Button>
                    <Button type="success" icon="ios-add" size="small" @click="openComponent(`ICreate`)">添加</Button>
                </ButtonGroup>
            </FormItem>
        </ISearch>

        <ITable :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange" :loading="loading">

            <template slot-scope="{ row, index }" slot="name">
                <span>{{ row.name }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="description">
                <span>{{ row.description }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <ButtonGroup>
                    <Button type="warning" size="small" @click="openComponent('IUpdate', {id: row.id})">编辑</Button>
                    <Button type="error" size="small" @click="submitForRemove(row)">删除</Button>
                </ButtonGroup>
            </template>

        </ITable>

		<component slot="component" v-if="componentProps.value" :is="componentProps.view" v-model="componentProps.value"
				   :props="componentProps.props"
				   @input="getLists(page.current)"></component>
    </IContent>
</template>

<script>
    import IContent from "../../../../components/layout/IContent";
    import ISearch from "../../../../components/layout/ISearch";
    import ITable from "../../../../components/layout/ITable";
    import IContentMixins from "../../../../mixins/iContentMixins"

    export default {
        components: {
            ICreate: () => import('./create'),
            IUpdate: () => import('./update'),
			ITable, ISearch, IContent
        },
        mixins: [IContentMixins],
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
            submitForRemove(data) {
                this._confirm().then(() => {
                    this.loading = true;
                    this.$http.delete(`authorities/role/${data.id}`)
                        .then(() => {
                            this.getLists(this.page.current)
                        });
                });
            }
        }
    }
</script>

<style>
</style>
