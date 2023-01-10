<template>
    <div class="body-table">
        <Card :shadow="shadow">
            <template #title>{{ title }}</template>
            <BodyTableContent :style="`height: ${this.tableHeight}px;`" ref="bodyTableContent" :default-show-search="defaultShowSearch"
                :loading="loading" :columns="defaultColumns" :data="data"  v-model="defaultModelValue"
                @on-refresh="handleRefresh" @on-selection-change="handleSelectionChange"
                @on-current-change="handleCurrentChange"
            >
                <template #search>
                    <slot name="search"></slot>
                </template>
                <template #header-right>
                    <slot name="header-right"></slot>
                </template>
                <template #header-left>
                    <slot name="header-left"></slot>
                </template>
                <slot></slot>
            </BodyTableContent>
        </Card>
    </div>
</template>

<script>
import BodyTableContent from "@/components/layout/body/BodyTableContent";
import ResizeObserver from "resize-observer-polyfill";

export default {
    name: "BodyTable",
    components: {BodyTableContent},
    props: {
        title: {
            type: String,
            default: "面板名称"
        },
        loading: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: Object,
            default: () => {
                return {
                    total: 0,
                    page: 1,
                    "page-size": 30
                }
            }
        },
        defaultShowSearch: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            showColumns: this.columns.map((item) => {
                return {name: item.title, value: true}
            }),
            tableHeight: 0,
            clientHeight: 0
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.clientHeight = this.$el.clientHeight;
            this.tableHeight = this.clientHeight - 75;
            this.handleResize();
        })
    },
    computed: {
        defaultModelValue:{
            get(){
                return this.modelValue;
            },set(v){
                this.$emit("update:modelValue", v);
            }
        },
        defaultColumns() {
            let columns = [{
                type: 'selection',
                width: 60,
                align: 'center'
            }];
            this.showColumns.forEach((item, index) => {
                if (this.showColumns[index].value) {
                    let column = this.columns[index];

                    if (this.getRenderType(column) === 'slot') {
                        const slot = column.slot;
                        column.render = (h, params) => {
                            if(typeof this.$slots[slot] === 'function'){
                                return h("div", {}, this.$slots[slot]({
                                    row: params.row,
                                    column: params.column,
                                    index: params.index
                                }));
                            }else{
                                return h('div', {}, `找不到 ${slot} 的template!`);
                            }
                        }
                        delete column.slot;
                    }
                    columns.push(column);
                }
            })
            return columns;
        }
    },
    methods: {
        getRenderType(column) {
            let renderType = '';
            if (column.type === 'index') {
                renderType = 'index';
            } else if (column.type === 'selection') {
                renderType = 'selection';
            } else if (column.type === 'html') {
                renderType = 'html';
            } else if (column.type === 'expand') {
                renderType = 'expand';
            } else if (column.render) {
                renderType = 'render';
            } else if (column.slot) {
                renderType = 'slot';
            } else {
                renderType = 'normal';
            }
            return renderType;
        },
        handleSelectionChange(selection){
            console.log(selection)
            this.$emit('on-selection-change', selection);
        },
        handleRefresh(page){
            this.$emit("on-refresh", page);
        },
        handleCurrentChange(currentRow, oldCurrentRow){
            this.$emit("on-current-change", currentRow, oldCurrentRow);
        },
        handleResize() {
            const robserver = new ResizeObserver((entries) => {
                this.tableHeight = this.$el.clientHeight - 75;
            });
            robserver.observe(this.$el);
        }
    }
}
</script>

<style scoped lang="less">
.body-table {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .ivu-card {
        height: 100%;
    }
}
</style>
