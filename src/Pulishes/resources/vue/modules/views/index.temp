<template>
    <IContent :spinShow="loading">
        <ISearch v-model="search"></ISearch>
        <ITable :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange">
            <template slot-scope="{ row, index }" slot="attribute">
                <Tag v-if="row.attribute === 0">良品货架</Tag>
            </template>
        </ITable>
    </IContent>
</template>

<script>
    import contentListPage from "../../../mixins/contentListPage";
    import IContent from "../../../components/content/index";
    import ISearch from "../../../components/content/search";
    import ITable from "../../../components/content/table";

    export default {
        name: "index",
        components: {ITable, ISearch, IContent},
        mixins: [contentListPage],
        data(){
            return {
                table: {
                    columns: [
                        {
                            title: '入库单号',
                            key: 'code'
                        }
                    ]
                },
                search: {}
            }
        }
    }
</script>

<style scoped>

</style>