<template>
    <IModal :loading="loading" v-model="defaultValue" title="上传文件" :width="500" >
        <Form :model="data" :label-width="100" :rules="ruleValidate" ref="formCreate">
            <FormItem label="文件地址" prop="file">
                <UploadInput v-model="data.file" :url="uploadUrl"></UploadInput>
            </FormItem>
            <FormItem label="文件说明" prop="remark">
                <Input v-model="data.remark"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button icon="md-arrow-round-up" @click="submit('formCreate')">上传附件</Button>
            <Button type="warning" icon="md-log-out" @click="defaultValue = false">返回</Button>
        </div>
    </IModal>
</template>

<script>
    import IModal from "./modal";
    import contentDrawer from "../../mixins/contentDrawer";
    import UploadInput from "../form/upload-input";
    export default {
        name: "upload-files",
        components: {UploadInput, IModal},
        mixins: [contentDrawer],
        props: {
            uploadUrl: {
                type: String,
                default: 'common/index/upload'
            }
        },
        data(){
            return {
                data: {},
                ruleValidate: {
                    file: [{required: true, message:'文件必须上传'}],
                    remark: [{required: true, message:'文件说明必须填写'}],
                }
            }
        },
        methods: {
            submit(name){
                this.validate(name).then(() => {
                    this.loading = true;
                    this.$http.post(this.props.url, this.data).then(() => {
                        this.$Notice.success({title: '成功', desc: '上传成功'});
                        this.defaultValue = false;
                    }).finally(() => {
                        this.loading = false;
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>
