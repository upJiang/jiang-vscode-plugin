import { request } from "@/utils/request";

interface IFetchChatGPTQuestionResult {
  choices: {
    finish_reason: string;
    index: number;
    message: {
      content: string;
      role: string;
    };
  }[];
}
interface IFetchChatGPTQuestionParams {
  houseName: string;
  apiKey: string;
  model: string;
  messages: Message[];
}

export interface Message {
  content: string;
  role: "user" | "system";
  time: string;
}
// POST 请求示例
export function fetchChatGPTQuestion(data: IFetchChatGPTQuestionParams) {
  return request<IFetchChatGPTQuestionResult>({
    url: `https://${data.houseName}/v1/chat/completions`,
    method: "POST",
    data: {
      model: data.model,
      messages: data.messages,
    },
    headers: {
      Authorization: `Bearer ${data.apiKey}`,
    },
  });
}
