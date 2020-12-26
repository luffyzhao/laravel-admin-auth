<template>
    <IContent v-model="componentProps">

        <ISearch v-model="search">
            <FormItem label="姓名">
                <Input v-model="search.name" placeholder="姓名" size="small"></Input>
            </FormItem>
            <FormItem :label-width="1">
                <ButtonGroup>
                    <Button type="primary" icon="ios-search" size="small">搜索</Button>
                    <Button type="success" icon="ios-add" size="small" @click="openComponent(`ICreate`)">添加</Button>
                </ButtonGroup>
            </FormItem>
        </ISearch>

        <ITable :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange">
            <template slot-scope="{ row, index }" slot="action">
                <Button v-if="Boolean(row.role)" type="warning" size="small" @click="openComponent('IUpdate', {id: row.id})">编辑</Button>
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
                search: {}
            }
        }
    }
</script>

<style>
</style>
