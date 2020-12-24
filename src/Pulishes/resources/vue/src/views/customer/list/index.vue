<template>
    <IContent v-model="componentProps">

        <ISearch v-model="search">
            <FormItem label="仓单号">
                <Input v-model="search.code" placeholder="仓单号" size="small"></Input>
            </FormItem>
            <FormItem label="订单号">
                <Input v-model="search.code" placeholder="订单号" size="small"></Input>
            </FormItem>
            <FormItem :label-width="1">
                <ButtonGroup>
                    <Button type="primary" icon="ios-search" size="small">搜索</Button>
                    <Button type="success" icon="ios-add" size="small" @click="openComponent(`ICreate`)">添加</Button>
                </ButtonGroup>
            </FormItem>
        </ISearch>

        <ITable :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange"></ITable>

        <component slot="component" v-if="componentProps.value" :is="componentProps.view" v-model="componentProps.value"
                   :props="componentProps.props"
                   @input="getLists(page.current)"></component>
    </IContent>
</template>

<script>
    import IContent from "../../../components/layout/IContent";
    import ISearch from "../../../components/layout/ISearch";
    import ITable from "../../../components/layout/ITable";
    import IContentMixins from "../../../mixins/iContentMixins"

    export default {
        components: {
            ICreate: () => import('./create'),
            ITable, ISearch, IContent
        },
        mixins: [IContentMixins],
        data() {
            return {
                search: {}
            }
        }
    }
</script>

<style>
</style>
