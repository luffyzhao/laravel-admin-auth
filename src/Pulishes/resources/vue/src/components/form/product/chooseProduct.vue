<template>
    <IModal :loading="loading" v-model="defaultValue" title="产品列表" :width="1200">
        <div class="choose-product" :style="`height: ${defaultHeight}px`">
            <ISearch v-model="search">
                <Row>
                    <FormItem label="效期管理">
                        <RemoteButton size="small" url="common/select/dictionaries/PRODUCT_NEED_VALIDITY"
                                      v-model="search.need_validity"
                                      @on-change="getLists"></RemoteButton>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label="存储条件">
                        <RemoteButton size="small" url="common/select/dictionaries/LOCATION_PARTITION_CONDITION"
                                      v-model="search.condition"
                                      @on-change="getLists"></RemoteButton>
                    </FormItem>
                </Row>
                <FormItem label="产品SKU">
                    <Input v-model="search.sku" placeholder="产品SKU" size="small"></Input>
                </FormItem>
                <FormItem label="默认条码">
                    <Input v-model="search.barcode" placeholder="产品默认条码" size="small"></Input>
                </FormItem>
                <FormItem label="产品名称">
                    <Input v-model="search.name" placeholder="产品名称" size="small"></Input>
                </FormItem>
                <FormItem :label-width="1">
                    <Button type="primary" icon="ios-search" @click="getLists(1)" size="small">搜索</Button>
                </FormItem>
            </ISearch>
            <ITable :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange">
                <template slot-scope="{ row, index }" slot="action">
                    <span v-if="isChoose(row)">已选取</span>
                    <Button size="small" @click="choose(row)" v-else>选取</button>
                </template>
                <template slot-scope="{ row, index }" slot="condition">
                    <RemoteSpan url="common/select/dictionaries/LOCATION_PARTITION_CONDITION"
                                v-model="row.condition"></RemoteSpan>
                </template>
                <template slot-scope="{ row, index }" slot="validity">
                    <RemoteSpan url="common/select/dictionaries/PRODUCT_NEED_VALIDITY"
                                v-model="row.need_validity"></RemoteSpan>
                </template>
            </ITable>
        </div>
    </IModal>
</template>

<script>
import IModal from "@/components/layout/IModal";
import ISearch from "@/components/layout/ISearch";
import ITable from "@/components/layout/ITable";
import IContentMixins from "@/mixins/iContentMixins";
import IDrawerMixins from '@/mixins/iDrawerMixins';
import IContent from "@/components/layout/IContent";
import RemoteButton from "@/components/form/remoteButton";
import RemoteSpan from "@/components/layout/RemoteSpan";

export default {
    name: "ProductChooseProduct",
    components: {RemoteSpan, RemoteButton, IContent, ITable, ISearch, IModal},
    mixins: [IContentMixins, IDrawerMixins],
    data() {
        return {
            defaultHeight: document.body.clientHeight / 1.5,
            loading: false,
            search: {
                status: 1
            },
            table: {
                columns: [{
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, {
                    title: '产品代码',
                    key: 'sku',
                    width: 200
                }, {
                    title: '商品名称',
                    key: 'name',
                    minWidth: 250
                }, {
                    title: '存储条件',
                    slot: 'condition',
                    width: 100
                },
                    {
                        title: '效期管理',
                        slot: 'validity',
                        width: 130
                    }, {
                        title: '操作',
                        slot: 'action',
                        width: 120
                    }],
            }
        }
    },
    mounted() {
    },
    methods: {
        getLists(page) {
            this.loading = true;
            this.$http.get(`product/choose`, {
                params: Object.assign({}, this.search, {page: page})
            }).then((data) => {
                this.table.data = data.data;
                this.page.total = data.total;
                this.page.current = data.current_page;
            }).finally(() => {
                this.loading = false;
            });
        },
        choose(row) {
            this.$emit('on-product-choose', row);
        },
        isChoose(row) {
            return this.props.products.findIndex((val) => val.sku === row.sku) !== -1;
        }
    }
}
</script>

<style scoped>
.choose-product {
    display: flex;
    flex-flow: column;
    overflow: hidden;
}
</style>
