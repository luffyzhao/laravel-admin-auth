<template>
  <div class="body-table-search">
    <Row>
      <Col :span="8" class="title">{{title}}</Col>
      <Col :span="16"><slot></slot></Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "BodyTableSearch",
  props: {
    title: String
  }
}
</script>

<style scoped lang="less">
.body-table-search{
  width: 250px;
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 10px;
  .title{
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    background-color: #f8f8f9;
    line-height: 24px;
    text-align: center;
  }
}
</style>