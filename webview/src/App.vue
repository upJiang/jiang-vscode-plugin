<template>
  <router-view />
</template>

<script lang="ts" setup>
import { initMessageListener } from '@/utils/vscodeUtils'
initMessageListener()
</script>

<style lang="less">
#app {
  color: #2c3e50;
  text-align: center;
}
</style>
