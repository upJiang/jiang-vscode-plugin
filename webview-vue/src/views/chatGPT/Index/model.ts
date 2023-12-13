import { ref } from "vue";
import { useRoute } from "vue-router";

import type { Message } from "./api";

export const useModel = () => {
  // 当前调用的域名
  const hostname = (useRoute().query.hostname as string) || "";
  const apiKey = (useRoute().query.apiKey as string) || "";

  // 消息列表
  const messageList = ref<Message[]>([]);

  // 用户输入
  const userInput = ref("");

  // 是否在加载
  const loading = ref(false);

  // 是否能重新提交,在加载已经流式输出时不能重新提交
  const canSubmit = ref(true);

  return {
    messageList,
    userInput,
    hostname,
    apiKey,
    loading,
    canSubmit,
  };
};

export type Model = ReturnType<typeof useModel>;
