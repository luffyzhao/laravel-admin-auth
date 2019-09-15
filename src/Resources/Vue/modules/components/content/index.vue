<template>
    <div class="content-wrapper">
        <div class="wrapper">
            <slot></slot>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    export default {
        name: "i-content",
        props: {
            spinShow: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped lang="less">
    .content-wrapper {
        display: flex;
        flex-flow: column;
        overflow: hidden;
        .wrapper{
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-flow: column;
        }
        & > .ivu-card {
            margin-bottom: 10px;
        }
    }
</style>