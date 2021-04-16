<template>
    <Input readonly v-model="value">
        <Upload :multiple="false" :on-success="handleUpload"
                :show-upload-list="false" :on-format-error="handleError"
                :action="action" :headers="headers" ref="upload" slot="append">
            <Button icon="ios-cloud-upload-outline">上传</Button>
        </Upload>
        <Button slot="prepend" @click="open">查看</Button>
    </Input>
</template>

<script>
    export default {
        name: "uploadFile",
        props: {
            url: {
                type: String,
                required: true
            },
            value: {
                type: String,
                default: ''
            }
        },
        computed: {
            action() {
                return this.$http.defaults.baseURL + this.url;
            },
            headers() {
                return {
                    authorization: 'bearer ' + this.$store.state.common.token,
                    Accept: 'application/json'
                }
            }
        },
        methods: {
            handleUpload(file) {
                this.$emit('input', file.url);
                this.$refs.upload.clearFiles();
            },
            handleError() {
                if (Boolean(this.value)) {
                    this.$Message.info("图片格式不正确,请上传正确的图片格式");
                }
            },
            open(){
                if(this.value === ''){
                    this.$Message.error('还没有上传文件，请先上传文件！！');
                }else{
                    window.open(this.value, '')
                }
            }
        }
    }
</script>

<style scoped>

</style>
