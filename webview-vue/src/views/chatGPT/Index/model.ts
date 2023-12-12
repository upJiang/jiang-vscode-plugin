import { ref } from "vue";
import { useRoute } from "vue-router";

interface Message {
  text: string;
  type: "user" | "robot";
}
export const useModel = () => {
  const hostname = (useRoute().query.hostname as string) || "";
  const apiKey = (useRoute().query.apiKey as string) || "";
  const messages = ref<Message[]>([]);
  const userInput = ref("");
  return { messages, userInput, hostname, apiKey };
};

export type Model = ReturnType<typeof useModel>;
