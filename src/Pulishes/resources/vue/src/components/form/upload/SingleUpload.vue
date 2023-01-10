<template>
    <div class="SingleUpload">
        <Input readonly v-model="defaultModelValue">
            <template #append>
                <Upload :multiple="false"
                        :format="format"
                        :max-size="maxSize"
                        :on-exceeded-size="handleMaxSize"
                        :on-success="handleUpload"
                        :on-format-error="handleError"
                        :on-progress="handleProgress"
                        :before-upload="beforeUpload"
                        :show-upload-list="false"
                        :action="action" :headers="headers" ref="upload">
                    <Button icon="ios-cloud-upload-outline">上传</Button>
                </Upload>
            </template>
            <template #prepend>
                <Button @click="open(defaultModelValue)">查看</Button>
            </template>
        </Input>
        <Spin fix v-if="loading"></Spin>
    </div>
</template>

<script>
import Index from "./index";

export default {
    name: "SingleUpload",
    mixins: [Index],
    props: {
        modelValue: {
            type: [String],
            default: ''
        },
    },
    methods: {
        handleUpload(file) {
            this.defaultModelValue = file.url;
            this.$refs.upload.clearFiles();
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.SingleUpload{
    position: relative;
}
</style>
