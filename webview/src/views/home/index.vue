<template>
  <div style="font-size: 28px; color: blue">{{ model.name.value }}主页</div>
</template>
<script lang="ts" setup>
import { usePresenter } from './presenter'

const presenter = usePresenter()
const { model } = presenter
</script>
