<template>
    <IModal :loading="loading" v-model="defaultValue" title="货架列表" :width="1200">
        <div style="height: 300px;display: flex;flex-flow: column;overflow: hidden;">
            <ISearch v-model="search">
                <FormItem label="货架号">
                    <Input v-model="search.code" placeholder="货架号" size="small"></Input>
                </FormItem>
                <FormItem label="货架分区">
                    <Input v-model="search.partition" placeholder="货架分区" size="small"></Input>
                </FormItem>
                <FormItem label="货架属性">
                    <Select v-model="search.attribute" size="small" clearable style="width: 150px;">
                        <Option :value="0">良品货架</Option>
                        <Option :value="1">不良品货架</Option>
                        <Option :value="2">可销售不良品货架</Option>
                    </Select>
                </FormItem>
                <FormItem :label-width="1">
                    <Button type="primary" icon="ios-search" @click="getLists(1)" size="small">搜索</Button>
                </FormItem>
            </ISearch>

            <ITable :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange">
                <template slot-scope="{ row, index }" slot="attribute">
                    <Tag v-if="row.attribute === 0">良品货架</Tag>
                    <Tag v-if="row.attribute === 1">不良品货架</Tag>
                    <Tag v-if="row.attribute === 2">可销售不良品货架</Tag>
                </template>
                <template slot-scope="{ row, index }" slot="status">
                    <span v-if="row.status === 0">不可用</span>
                    <span v-if="row.status === 1">可用</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button size="small" @click="choose(row)">选取</button>
                </template>
            </ITable>
        </div>
    </IModal>
</template>

<script>
    import IModal from "../content/modal";
    import ISearch from "../content/search";
    import ITable from "../content/table";
    import contentListPage from "../../mixins/contentListPage";
    import contentDrawer from '../../mixins/contentDrawer';

    export default {
        name: "chooseLocationList",
        components: {ITable, ISearch, IModal},
        mixins: [contentListPage, contentDrawer],
        data() {
            return {
                loading: false,
                search: {},
                table: {
                    columns: [
                        {
                            title: '货架号',
                            key: 'code'
                        },
                        {
                            title: '货架属性',
                            slot: 'attribute'
                        },
                        {
                            title: '货架分区',
                            key: 'partition'
                        },
                        {
                            title: '状态',
                            slot: 'status'
                        },
                        {
                            title: '操作',
                            slot: 'action'
                        },
                    ]
                }
            }
        },
        methods: {
            getLists(page) {
                this.loading = true;
                this.$http.get(`warehouse/location`, {
                    params: Object.assign({}, this.search, {page: page})
                }).then((data) => {
                    this.table.data = data.data
                    this.page.total = data.total
                    this.page.current = data.current_page
                }).finally(() => {
                    this.loading = false;
                });
            },
            choose(row) {
                this.$emit('on-location-choose', row);
                this.defaultValue = false;
            }
        }
    }
</script>

<style scoped>

</style>
