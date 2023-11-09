<template>
  <div style="font-size: 28px; color: blue; cursor: pointer" @click="presenter.handleAddSnippets">
    {{ model.name.value }}添加代码片段
  </div>
</template>
<script lang="ts" setup>
import { usePresenter } from './presenter'

const presenter = usePresenter()
const { model } = presenter
</script>
