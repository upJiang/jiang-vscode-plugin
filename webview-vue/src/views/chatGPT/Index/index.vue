<template>
  <div class="chat-container">
    <div class="messages-container">
      <div
        v-for="(message, index) in model.messages.value"
        :key="index"
        :class="[message.type, 'message-item']"
      >
        <template v-if="message.type === 'user'">
          <span>
            {{ message.text }}
          </span>
          <img class="avatar user" src="https://junfeng530.xyz/user.png" />
        </template>
        <template v-if="message.type === 'robot'">
          <img class="avatar robot" src="https://junfeng530.xyz/robot.png" />
          <span>
            {{ message.text }}
          </span>
        </template>
      </div>
    </div>
    <div class="input-container">
      <a-input
        v-model:value.trim="model.userInput.value"
        class="user-input"
        placeholder="请输入您的问题"
      />
      <a-button
        style="background-color: #4caf50"
        @click="presenter.sendMessage"
        type="primary"
      >
        发送
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style scoped lang="scss">
@import url("./index.scss");
</style>
