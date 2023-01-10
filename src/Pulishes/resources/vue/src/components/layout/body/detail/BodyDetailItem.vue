<template>
    <Col :span="span" class="body-detail-item-col">
        <div class="body-detail-item" :style="itemStyle">
            <div class="title" :style="titleStyle">{{ title }}</div>
            <Paragraph :ellipsis="ellipsis" :copyable="copyable" class="body-detail-item-slot"><slot></slot></Paragraph>
        </div>
    </Col>
</template>

<script>
import VCell from "@/components/layout/VCell";
export default {
    name: "BodyDetailItem",
    components: {VCell},
    props: {
        span: {
            type: [String, Number],
            default: 4
        },
        width: {
            type: [String, Number],
            default: 100
        },
        title: [String],
        copyable: {
            type: Boolean,
            default: false
        },
        ellipsis: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        itemStyle() {
            return {
                paddingLeft: this.width + 'px'
            };
        },
        titleStyle() {
            return {
                width: this.width + 'px'
            };
        }
    }
}
</script>

<style scoped lang="less">
.body-detail-item-col{
    margin-bottom: 1px;
}
.body-detail-item {
    padding-left: 100px;
    position: relative;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e8eaec;
    .title {
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        text-align: right;
        padding-right: 10px;
        background: #f8f8f9;
        &:after {
            position: absolute;
            right: 0;
            top: 0;
            content: ":";
            width: 10px;
            text-align: center;
        }
    }
    .body-detail-item-slot{
        padding:0 2px;
    }
}
</style>
