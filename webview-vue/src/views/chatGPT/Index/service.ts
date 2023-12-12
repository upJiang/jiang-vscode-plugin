import { fetchChatGPTQuestion } from "./api";
import { Model } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async askQuestion() {
    console.log("hostname", this.model.hostname);
    console.log("apiKey", this.model.apiKey);

    const res = await fetchChatGPTQuestion({
      houseName: this.model.hostname,
      apiKey: this.model.apiKey,
      question: this.model.userInput.value,
    });
    if (res?.choices && res?.choices.length) {
      this.model.messages.value.push({
        text: res.choices[0].message.content,
        type: "robot",
      });
    }
  }
}
