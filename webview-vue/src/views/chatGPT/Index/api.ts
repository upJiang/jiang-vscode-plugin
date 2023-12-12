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
  question: string;
}
// POST 请求示例
export function fetchChatGPTQuestion(data: IFetchChatGPTQuestionParams) {
  return request<IFetchChatGPTQuestionResult>({
    url: `https://${data.houseName}/v1/chat/completions`,
    method: "POST",
    data: {
      model: "gpt-3.5-turbo-0301",
      messages: [
        {
          role: "user",
          content: data.question,
        },
      ],
    },
    headers: {
      Authorization: `Bearer ${data.apiKey}`,
    },
  });
}
