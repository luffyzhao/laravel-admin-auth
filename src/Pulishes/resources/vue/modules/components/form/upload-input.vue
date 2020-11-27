<template>
    <div style="position: relative;">
        <Input readonly v-model="value">
            <Button slot="prepend" @click="open">查看</Button>
            <Upload ref="upload" :action="action"
                    :headers="headers" slot="append" :accept="accept"
                    :format="format" :on-success="success" :multiple="false" :show-upload-list="false"
                    :before-upload="before" :on-error="error"
            >
                <Button icon="ios-cloud-upload-outline" :loading="loading">{{buttonString}}</Button>
            </Upload>
        </Input>
        <Spin size="large" fix v-if="loading"></Spin>
    </div>
</template>

<script>
    import {baseUrl} from "../../../libs/util";

    export default {
        name: "upload-input",
        props: {
            url: {
                type: String,
                required: true
            },
            value: {
                type: String,
                default: ''
            },
            accept: {
                type: String,
                default: ''
            },
            format: {
                type: Array,
                default: () => []
            },
            buttonString: {
                type:String,
                default: '选择文件'
            }
        },
        data(){
            return {
                loading: false
            }
        },
        computed: {
            action(){
                return baseUrl() + this.url;
            },
            headers(){
                return {
                    authorization: 'bearer ' + this.$store.state.auth.login,
                    Accept: 'application/json'
                }
            }
        },
        methods: {
            success(file){
                this.$emit('input', file.url);
                this.$refs.upload.clearFiles();
                this.setLoading(false);
            },
            before(){
                this.setLoading(true);
            },
            error(){
                this.setLoading(false);
            },
            setLoading(val){
                this.loading = val;
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
