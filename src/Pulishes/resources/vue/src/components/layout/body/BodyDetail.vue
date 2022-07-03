<template>
  <div class="default-component">
    <Row class="header">
      <Col :span="20" class="header-items">
        <template v-for="(item, index) in navList">
          <div class="body-detail-header body-detail-header-active" v-if="activeKey === item.name"
               @click="handleChange(item)">
            <Render v-if="item.labelType === 'function'" :render="item.label"></Render>
            <template v-else>{{ item.label }}</template>
          </div>
          <div class="body-detail-header" v-else @click="handleChange(item)">
            <Render v-if="item.labelType === 'function'" :render="item.label"></Render>
            <template v-else>{{ item.label }}</template>
          </div>
        </template>
      </Col>
      <Col :span="4" class="close">
        <Icon type="md-close" @click="handleVisibleChange"/>
      </Col>
    </Row>
    <div class="default-component-body" ref="detail">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Render from 'view-ui-plus/src/components/base/render';

export default {
  name: "BodyDetail",
  components: {Render},
  provide() {
    return {
      bodyDetail: this
    };
  },
  props: {
    modelValue: {
      type: [String, Number]
    }
  },
  data() {
    return {
      detailItems: [],
      navList: [],
      activeKey: this.modelValue
    }
  },
  methods: {
    handleVisibleChange() {
      this.$emit("on-visible-change", false)
    },
    updateNav() {
      this.navList = [];
      this.detailItems.forEach(({pane}, index) => {
        this.navList.push({
          labelType: typeof pane.currentLabel,
          label: pane.currentLabel,
          name: pane.currentName || index
        });
        if (!pane.currentName) pane.currentName = index;
        if (index === 0) {
          if (!this.activeKey) this.activeKey = pane.currentName || index;
        }
      });
    },
    handleChange(item) {
      this.activeKey = item.name;
      this.$emit('update:modelValue', item.name);
    },
    updateVisibility(index) {
      [...this.$refs.detail.querySelectorAll(`.body-detail`)].forEach((el, i) => {
        if (index === i) {
          el.style.display = 'block'
        } else {
          el.style.display = 'none'
        }
      });
    },
    getTabIndex(name) {
      return this.navList.findIndex(nav => nav.name === name);
    }
  }, watch: {
    modelValue(val) {
      this.activeKey = val;
    },
    activeKey(val) {
      const nextIndex = Math.max(this.getTabIndex(val), 0);
      this.updateVisibility(nextIndex);
    }
  },
  mounted() {
    this.updateVisibility(this.getTabIndex(this.activeKey));
  }
}
</script>

<style scoped lang="less">
.default-component {
  height: 40%;
  background-color: white;
  z-index: 9;
  position: relative;

  .header {
    background-color: #f8f8f9;
    border-bottom: 1px solid #c5c8ce;
    border-top: 1px solid #c5c8ce;
    padding: 0 5px;

    .close {
      text-align: right;

      .ivu-icon {
        cursor: pointer;
      }
    }

    .header-items {
      position: relative;

      .body-detail-header {
        display: inline-block;
        cursor: pointer;
        margin-right: 5px;
        padding-right: 8px;
        padding-left: 8px;
        position: relative;
        bottom: -1px;
        font-size: 12px;
      }

      .body-detail-header-active {
        border-bottom: 2px solid #2d8cf0;
      }
    }
  }

  .default-component-body {
    padding: 5px;
    height: calc(100% - 24px);
    overflow: hidden;
    box-sizing: border-box;

  }

  .ivu-split-trigger-horizontal {
    position: relative;
    cursor: pointer;
  }
}
</style>