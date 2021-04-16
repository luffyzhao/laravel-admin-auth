<template>
    <Upload
        :multiple="false"
        type="drag"
        :on-success="handleUpload"
        :show-upload-list="false"
        :format="['jpg','jpeg','png', 'gif']"
        :on-format-error="handleError"
        :action="action"
        :headers="headers"
        ref="upload"
    >
        <div style="padding: 20px; width: 340px; height: 240px;text-align: center;line-height: 240px;margin: 0 auto;">
            <Icon type="ios-cloud-upload" size="200" style="color: #3399ff" v-show="value === ''"></Icon>
            <img :src="value" v-show="value !== ''" @error="handleError" style="max-width: 300px; max-height: 200px"/>
        </div>
    </Upload>
</template>

<script>
    export default {
        name: "UploadImage",
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
            action(){
                return this.$http.defaults.baseURL + this.url;
            },
            headers(){
                return {
                    authorization: 'bearer ' + this.$store.state.common.token,
                    Accept: 'application/json'
                }
            }
        },
        methods: {
            handleUpload(file){
                this.$emit('input', file.url);
                this.$refs.upload.clearFiles();
            },
            handleError(){
                if(Boolean(this.value)){
                    this.$Message.info("图片格式不正确,请上传正确的图片格式");
                }
            }
        }
    }
</script>

<style scoped>

</style>
