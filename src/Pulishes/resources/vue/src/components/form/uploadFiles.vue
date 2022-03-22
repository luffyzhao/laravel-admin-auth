<template>
  <div>
    <Upload ref="upload"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-format-error="handleFormatError"
            :max-size="maxSize"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :on-remove="handleRemove"
            :defaultFileList="value"
            :headers="headers"
            :action="action">
    </Upload>
    <Button icon="ios-cloud-upload-outline" @click="handleClick">上传</Button>

    <Modal v-model="modalView" title="文件类型选择">
      <template v-if="modalView">
        <RemoteSelect :url="fileTypeUrl" @on-change="handleModalChange"></RemoteSelect>
      </template>
    </Modal>

  </div>
</template>

<script>
import RemoteSelect from "@/components/form/remoteSelect";
import IUpload from "../iUpload";

export default {
  name: "uploadFiles",
  components: {RemoteSelect},
  mixins: [IUpload],
  props: {
    fileTypeUrl : {
      type: String,
      default: "common/select/dictionaries/FILE_TYPE"
    }
  },
  data() {
    return {
      modalView: false,
      fileType: null
    }
  },
  methods: {
    handleClick() {
      this.modalView = true;
    },
    handleRemove(file, fileList) {
      this.$emit('input', fileList);
    },
    handleSuccess(res, file) {
      res.name = this.fileType.name;
      let defaultValue = JSON.parse(JSON.stringify(this.value));
      defaultValue.push(res)
      this.defaultValue = defaultValue;
      this.handleEnd();
    },
    handleModalChange(item) {
      this.fileType = item;
      let filter = this.value.filter((val) => {
        return val.name === item.name;
      });
      if(filter.length === 0){
        this.$refs['upload'].handleClick();
      }else{
        this.$Message.error(item.name + '已存在, 不能重复上传！');
      }
    }
  }
}
</script>

<style scoped>

</style>
