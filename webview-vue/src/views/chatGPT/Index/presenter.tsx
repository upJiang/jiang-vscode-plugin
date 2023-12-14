import { watch } from "vue";
import { useRoute } from "vue-router";

import { useModel } from "./model";
import Service from "./service";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const route = useRoute();

  // 发送消息
  const sendMessage = (content: string) => {
    model.messageList.value.push({
      content,
      role: "user",
      time: new Date().toLocaleString(),
    });
    service.askQuestion();
    model.userInput.value = "";
  };

  // 回车发送
  const sendMessageEnter = () => {
    if (model.userInput.value && model.canSubmit.value) {
      sendMessage(model.userInput.value);
    }
  };

  watch(
    () => route.query?.selectedText,
    () => {
      if (route.query?.selectedText && model.canSubmit.value) {
        sendMessage(`${route.query.selectedText}, 请帮我解释这段文案`);
      }
    },
    {
      immediate: true,
    },
  );

  return {
    model,
    service,
    sendMessageEnter,
    sendMessage,
  };
};
