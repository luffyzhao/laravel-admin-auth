<template>
    <div class="list-panel">
        <Table :columns="columns" :loading="loading" size="small" :data="table.data" ref="Table" highlight-row
               @on-current-change="currentChange"
               :height="tableHeight">
            <slot></slot>
        </Table>
        <Page :current="current" :total="total" :page-size="pageSize"
              show-total @on-change="change" size="small" transfer
              show-elevator show-sizer @on-page-size-change="pageSizeChange"
              :page-size-opts="[15, 30,50, 100, 200, 300]"/>
    </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';

export default {
    name: "i-table",
    props: {
        current: {
            type: Number
        },
        total: {
            type: Number
        },
        pageSize: {
            type: Number,
            default: 15
        },
        table: {
            type: Object,
            default: () => {
                return {columns: [], table: []}
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        selection: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableHeight: 0,
            currentRow: {}
        }
    },
    computed: {
        columns() {
            if (this.selection === true) {
                this.table.columns.unshift({
                    type: 'selection',
                    width: 60,
                    align: 'center'
                });
            }
            return this.table.columns;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.handleResize();
            this.handleScoped();
        });
    },
    methods: {
        handleResize() {
            const robserver = new ResizeObserver((entries) => {
                const entry = entries[0];
                const {height} = entry.contentRect;
                this.tableHeight = height - 45;
            });
            robserver.observe(this.$el);
        },
        handleScoped() {
            for (let i in this.$scopedSlots) {
                this.table.columns.forEach((val, key) => {
                    if (val.slot === i || val.key === i) {
                        val.slot = null;
                        val.render = (h, {row, column, index}) => {
                            return h('div', this.$scopedSlots[i]({row, column, index}))
                        };
                    }
                });
            }
        },
        change(page) {
            this.$emit('on-page-change', {
                page: page,
                per_page: this.pageSize
            });
        },
        pageSizeChange(pageSize) {
            this.$emit('on-page-change', {
                page: this.current,
                per_page: pageSize
            });
        },
        getSelection() {
            return this.$refs.Table.getSelection();
        },
        currentChange(currentRow, oldCurrentRow) {
            this.currentRow = currentRow;
            this.$emit('on-current-change', {
                currentRow,
                oldCurrentRow
            });
        }
    }
}
</script>

<style scoped lang="less">
.list-panel {
    background-color: #fff;
    flex: 1;
    position: relative;
    height: 100%;
    overflow: hidden;
}

.ivu-page {
    margin-top: 10px;
    text-align: center;
}
</style>
