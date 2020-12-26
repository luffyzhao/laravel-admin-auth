<template>
    <div class="i-content">
        <transition name="slot-transition">
            <div class="transition" v-show="!value.value">
                <slot></slot>
            </div>
        </transition>
        <transition name="component-transition">
            <div class="transition" v-show="value.value">
                <slot name="component"></slot>
            </div>
        </transition>
        <Spin size="large" fix v-if="loading"></Spin>
    </div>
</template>

<script>
    export default {
        name: "IContent",
        props: {
            value: {
                type: Object,
                default: () => {
                    return {
                        value: false
                    }
                }
            },
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .i-content {
        height: 100%;
        position: relative;
    }

    .transition {
        height: 100%;
        display: flex;
        flex-flow: column;
    }
</style>