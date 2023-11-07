<template>
  <div>{{ model.name.value }}</div>
</template>
<script lang="ts" setup>
import { usePresenter } from './presenter'

const presenter = usePresenter()
const { model } = presenter
</script>
