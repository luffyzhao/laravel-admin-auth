<template>
    <div>
        <div class="demo-upload-list" v-for="(item, index) in defaultValue">
            <img :src="item">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
        </div>
        <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                multiple
                :headers="headers"
                type="drag"
                :action="action"
                class="upload-list-input">
            <div  class="upload-list-cover">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <ModalCarousel v-model="visible" :props="{lists: defaultValue}"></ModalCarousel>
    </div>
</template>
<script>
    import ModalCarousel from "../layout/ModalCarousel";

    export default {
        name: "UploadImages",
        components: {ModalCarousel},
        props: {
            url: {
                type: String,
                required: true
            },
            value: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            defaultValue: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            },
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
        data() {
            return {
                visible: false
            }
        },
        methods: {
            handleView(name) {
                this.visible = true;
            },
            handleRemove(index) {
                let value = JSON.parse(JSON.stringify(this.defaultValue));
                value.splice(index, 1);
                this.defaultValue = value;
            },
            handleSuccess(res, file) {
                let value = JSON.parse(JSON.stringify(this.defaultValue));
                value.push(res.url);
                this.defaultValue = value;
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '上传失败',
                    desc: '不是图片格式'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '上传失败',
                    desc: '文件最大只能上传2M'
                });
            }
        }
    }
</script>
<style>
    .demo-upload-list {
        display: inline-block;
        width: 120px;
        height: 120px;
        text-align: center;
        line-height: 120px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

    .upload-list-cover{
        width: 118px;
        height:118px;
        line-height:118px;
    }
    .upload-list-input{
        display: inline-block;
        width:118px;
    }
</style>
