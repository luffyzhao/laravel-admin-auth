<template>
    <div class="table-content">
        <Row class="header">
            <Col :span="18" class="header-left">
                <Button icon="md-refresh" type="success" @click="refresh"></Button>
                <slot name="header-left"></slot>
            </Col>
            <Col :span="6" class="header-right">
                <slot name="header-right">
                    <div class="default">
                <span class="icon">
                  <Dropdown trigger="click">
                    <Icon type="ios-list-box"/>
                    <template #list>
                      <div class="dropdown-list">
                        <div v-for="(item, index) in showColumns" :key="index">
                          <Checkbox v-model="item.value">
                            <span>{{ item.name }}</span>
                          </Checkbox>
                        </div>
                      </div>
                    </template>
                  </Dropdown>
                </span>
                        <span class="icon">
                                    <Icon type="md-print"/>
                                </span>
                        <span class="icon">
                                    <Icon type="ios-search" @click="isShowSearch"/>
                                </span>
                    </div>
                </slot>
            </Col>
        </Row>
        <div class="search" v-show="showSearch" ref="search">
            <slot name="search"></slot>
        </div>
        <div class="table">
            <Table border :columns="defaultColumns" :data="data" :height="tableHeight" highlight-row
                   size="small"
                   :loading="loading"
                   @on-row-dblclick="currentChange" ref="table">
                <slot></slot>
            </Table>
        </div>
        <div class="page">
            <Page size="small" show-total show-elevator show-sizer @on-page-size-change="pageSizeChange" transfer
                  @on-change="pageChange"
                  :page-size="modelValue['page-size']" :total="modelValue.total"
                  v-model="modelValue.page" :page-size-opts="[15, 30, 50, 100]"></Page>
        </div>
    </div>
</template>

<script>


import ResizeObserver from "resize-observer-polyfill";

export default {
    name: "BodyTableContent",
    props: {
        loading: {
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
    mounted() {
        this.$nextTick(() => {
            this.refresh();
            this.handleResize();
        })
    },
    data() {
        return {
            showSearch: this.defaultShowSearch,
            showColumns: this.columns.map((item) => {
                return {name: item.title, value: true}
            }),
            tableHeight: 0
        }
    },
    computed: {
        defaultColumns() {
            let columns = [];
            this.showColumns.forEach((item, index) => {
                if (this.showColumns[index].value) {
                    let column = this.columns[index];

                    if (this.getRenderType(column) === 'slot') {
                        const slot = column.slot;
                        column.render = (h, params) => {
                            return h("div", {}, this.$slots[slot]({
                                row: params.row,
                                column: params.column,
                                index: params.index
                            }));
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
        refresh() {
            this.$emit("on-refresh", this.modelValue.current_page);
        },
        pageSizeChange(pageSize) {
            let data = JSON.parse(JSON.stringify(this.modelValue));
            data['page-size'] = pageSize;
            this.$emit("update:modelValue", data);
            this.$emit("on-refresh", 1);
        },
        pageChange(page) {
            this.$emit("on-refresh", page);
        },
        currentChange(currentRow, oldCurrentRow) {
            this.$emit("on-current-change", currentRow, oldCurrentRow);
        },
        isShowSearch() {
            this.showSearch = !this.showSearch;
        },
        handleResize() {

            let arr = this.$el.querySelectorAll('.table');
            if (arr.length > 0) {
                const robserver = new ResizeObserver((entries) => {
                    const entry = entries[0];
                    let height = 0;
                    this.$el.childNodes.forEach((item) => {
                        if (!item.isSameNode(entry.target)) {
                            height += item.offsetHeight;
                        }
                    });
                    this.tableHeight = this.$el.clientHeight- height;
                });
                robserver.observe(arr[0]);
            }
        }
    }
}
</script>

<style scoped lang="less">
.table-content {
    height: 100%;
    display: flex;
    flex-direction: column;

    .search {
        background-color: white;
        border-top: 1px #dcdee2 solid;
        border-left: 1px #dcdee2 solid;
        border-right: 1px #dcdee2 solid;
        padding: 15px 10px 0 10px;
        height: auto;
    }

    .header {
        height: 50px;
        line-height: 50px;
        background-color: #f8f8f9;
        border-top: 1px #dcdee2 solid;
        border-left: 1px #dcdee2 solid;
        border-right: 1px #dcdee2 solid;
        padding-left: 10px;
        padding-right: 10px;

        .header-left {
            text-align: left;
        }

        .header-right {
            text-align: right;

            .default {
                span.icon {
                    width: 30px;
                    height: 30px;
                    display: inline-block;
                    border: 1px solid #dcdee2;
                    vertical-align: middle;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 4px;
                    cursor: pointer;

                    .dropdown-list {
                        padding: 10px;
                        text-align: left;
                    }

                    .ivu-icon {
                        font-size: 20px;
                        color: #808695;
                    }
                }
            }
        }
    }

    .table {
        flex: 1;
        overflow: hidden;
    }

    .page {
        background-color: #f8f8f9;
        line-height: 40px;
        height: 40px;
        text-align: center;
        border-bottom: 1px #dcdee2 solid;
        border-left: 1px #dcdee2 solid;
        border-right: 1px #dcdee2 solid;
    }
}
</style>
