<template>
    <IModal v-model="defaultValue" :width="450">
        <Form :model="data" :rules="ruleValidate" ref="formCreate" label-position="top">
            <FormItem label="模板文件" prop="file">
                <UploadFile v-model="data.file" url="/api/common/upload/file"></UploadFile>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" icon="ios-add" @click="submit('formCreate')">提交</Button>
            <Button type="warning" icon="md-log-out" @click="defaultValue = false">返回</Button>
        </div>
    </IModal>
</template>

<script>
    import IModal from "../../layout/IModal";
    import IDrawerMixins from "../../../mixins/iDrawerMixins";
    import UploadFile from '../../form/uploadFile'
    export default {
        name: "ProductImport",
        components: {IModal, UploadFile},
        mixins: [IDrawerMixins],
        data(){
            return {
                ruleValidate: {
                    file: [{required: true, message: '文件必须上传'}]
                },
                data: {}
            }
        },
        methods: {
            submit(name){
                this.validate(name).then(() => {
                    this.$http.post(`product/warehousing/template`, this.data).then((res) => {
                        res.products.forEach((v) => {
                            this.$emit('on-product-import-choose', v);
                        });
                        this.defaultValue = false;
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
