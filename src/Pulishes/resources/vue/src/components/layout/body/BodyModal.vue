<template>
    <Modal :title="title"
           model-value :mask-closable="false" :width="width"
           class-name="vertical-center-modal" @on-visible-change="handleVisibleChange">
        <template #header>
            <slot name="header"></slot>
        </template>
        <div class="modal-body">
            <slot></slot>
        </div>
        <template #footer>
            <slot name="footer">
                <div></div>
            </slot>
        </template>
        <Spin v-if="loading" fix></Spin>
    </Modal>
</template>

<script>
export default {
    name: "BodyModal",
    props: {
        title: {
            type: String
        },
        width: {
            type: Number,
            default: 1200
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleVisibleChange(v) {
            this.$emit('on-visible-change', false);
        }
    }
}
</script>

<style scoped>
.modal-body {
    max-height: 60vh !important;
    overflow-y: auto;
    padding: 10px;
}
</style>
