<template>
  <a-form
    class="form-contariner"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    labelAlign="right"
  >
    <a-form-item label="提示" v-bind="presenter.validateInfos.tips">
      <a-input
        v-model:value="model.formState.tips"
        placeholder="请输入"
        allow-clear
        style="width: 250px"
      />
    </a-form-item>
    <a-form-item label="前缀" v-bind="presenter.validateInfos.prefix">
      <a-input
        v-model:value="model.formState.prefix"
        placeholder="请输入"
        allow-clear
        style="width: 250px"
      />
    </a-form-item>
    <a-form-item label="内容" v-bind="presenter.validateInfos.body">
      <a-textarea
        v-model:value="model.formState.body"
        placeholder="请输入"
        allow-clear
        :rows="3"
        style="width: 250px"
      />
    </a-form-item>
    <a-form-item label="描述" v-bind="presenter.validateInfos.description">
      <a-input
        v-model:value="model.formState.description"
        placeholder="请输入"
        allow-clear
        style="width: 250px"
      />
    </a-form-item>
    <a-button @click="presenter.handleOnSubmit" type="primary">提交</a-button>
  </a-form>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style scoped lang="scss">
@import url("./index.scss");
</style>
