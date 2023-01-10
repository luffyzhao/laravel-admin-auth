<template>
    <div class="MultipleUpload">
        <Row>
            <Col span="12">
                <Upload
                    multiple
                    :format="format"
                    :max-size="maxSize"
                    :on-exceeded-size="handleMaxSize"
                    :show-upload-list="false"
                    :on-progress="handleProgress"
                    :on-success="handleUpload"
                    :on-format-error="handleError"
                    :action="action" :headers="headers" ref="upload"
                    type="drag">
                    <div>
                        <Icon type="ios-cloud-upload" size="56" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
            </Col>
            <Col span="12" class="box">
                <template v-for="(row,index) in defaultModelValue">
                    <Row class="list">
                        <Col span="18">
                            <Text ellipsis class="text" type="success" @click="open(row)">{{row}}</Text>
                        </Col>
                        <Col span="6" class="action">
                            <Text class="action-text" type="warning" @click="deleteRow(index)">
                               删除
                            </Text>
                        </Col>
                    </Row>
                </template>
            </Col>
        </Row>
        <Spin fix v-if="loading"></Spin>
    </div>
</template>

<script>
import Index from "./index";

export default {
    name: "MultipleUpload",
    mixins: [Index],
    props: {
        modelValue: {
            type: [Array],
            default: () => []
        },
    },
    methods: {
        handleUpload(response, file, fileList) {
            this.defaultModelValue.push(response.url);
            this.loading = false;
        },
        deleteRow(index){
            this.defaultModelValue.splice(index, 1);
        }
    }
}
</script>

<style scoped lang="less">
.MultipleUpload{
    position: relative;
}
.box{
    height: 90px;
    border-top: 1px dashed #dcdee2;
    border-bottom: 1px dashed #dcdee2;
    border-right: 1px dashed #dcdee2;
    overflow-y: auto;
}
.list{
    padding: 0 10px;
    border-bottom: 1px dashed #dcdee2;
}
.text{
    width: 100%;
    cursor: pointer;
}
.text:hover{
    color: #2d8cf0;
}
.action{
    text-align: right;
    .action-text{
        cursor: pointer;
    }
}
</style>
