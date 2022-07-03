<template>
    <div class="body-content" :style="styles" v-resize="handleResize">
        <div :class="class1">
            <slot></slot>
        </div>
        <component v-if="modelValue.render !== null" :is="modelValue.render" :props="modelValue.props"
                   @on-visible-change="handleVisibleChange"></component>
    </div>
</template>

<script>
import Trigger from 'view-ui-plus/src/components/split/trigger'

const defaultModelValue = {
    props: {},
    propsModal: {},
    render: null,
    renderModal: null
};

export default {
    name: "BodyContent",
    components: {Trigger},
    props: {
        modelValue: {
            type: Object,
            default: () => defaultModelValue
        }
    },
    data() {
        return {
            styles: {}
        }
    },
    mounted() {
        this.handleResize();
    },
    computed: {
        class1() {
            if (this.modelValue.render === null) {
                return ["default-slot"];
            } else {
                return ["default-slot", 'default-slot-60'];
            }
        }
    },
    methods: {
        handleVisibleChange() {
            this.$emit("update:modelValue", {
                props: {},
                render: null
            })
        },
        handleResize() {
            this.styles = {
                height: (window.document.body.clientHeight - 122) + 'px'
            }
        }
    }
}
</script>

<style scoped lang="less">
.body-content {
    height: 100%;
    width: 100%;
    overflow: hidden;


    .default-slot-60 {
        height: 60% !important;
    }

    .default-slot {
        height: 100%;
        width: inherit;
        padding: 15px;
        overflow: hidden;
        position: relative;
    }


}
</style>
