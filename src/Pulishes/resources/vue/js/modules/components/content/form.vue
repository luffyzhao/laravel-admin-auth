<template>
    <i-content :spin-show="spinShow">
        <div class="form-content">
            <div class="body-size" :style="`max-width: ${width}px`">
                <slot></slot>
            </div>
        </div>
        <div class="form-footer">
            <slot name="footer"></slot>
        </div>
    </i-content>
</template>

<script>
    import IContent from "./index";

    export default {
        name: "i-form",
        components: {IContent},
        props: {
            spinShow: {
                type: Boolean,
                default: true
            },
            width: {
                type: [String, Number],
                default: '720'
            }
        }
    }
</script>

<style scoped lang="less">
    .content-wrapper {
        background: #fff;
        display: flex;
        flex-flow: column;
        .form-content {
            height: 100%;
            overflow: auto;
            flex: 1;
            .body-size {
                padding-right: 100px;
                padding-top: 20px;
                height: 100%;
            }
        }

        .form-footer{
            padding: 10px 16px;
            text-align: left;
        }

    }
</style>