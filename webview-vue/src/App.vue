<template>
  <router-view />
</template>

<script lang="ts" setup>
import { initMessageListener } from '@/utils/vscodeUtils'
initMessageListener()
</script>

<style lang="less">
#app {
  height: 100vh;
  background: #fff;
}
</style>
