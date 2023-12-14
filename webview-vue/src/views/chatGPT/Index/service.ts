import { fetchChatGPTQuestion } from "./api";
import { Model } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async askQuestion() {
    try {
      this.model.loading.value = true;
      this.model.canSubmit.value = false;
      const res = await fetchChatGPTQuestion({
        houseName: this.model.hostname,
        apiKey: this.model.apiKey,
        messages: this.model.messageList.value,
        model: this.model.model,
      });

      if (res?.choices && res?.choices.length) {
        this.model.messageList.value.push({
          content: "",
          role: "system",
          time: new Date().toLocaleString(),
        });
        this.showText(res.choices[0].message.content);
      }
    } catch (error) {
      this.model.messageList.value.push({
        content: "",
        role: "system",
        time: new Date().toLocaleString(),
      });
      this.showText("sorry，未搜索到答案");
      this.model.canSubmit.value = true;
    } finally {
      this.model.loading.value = false;
    }
  }

  showText(orginText: string) {
    let currentIndex = 0;
    const animate = () => {
      this.model.messageList.value[
        this.model.messageList.value.length - 1
      ].content += orginText[currentIndex];
      currentIndex++;

      if (currentIndex < orginText.length) {
        const timeout = setTimeout(() => {
          requestAnimationFrame(animate);
          // requestAnimationFrame 感觉太快了，延迟一下
          if (currentIndex === orginText.length - 1) {
            this.model.canSubmit.value = true;
          }
          clearTimeout(timeout);
        }, 30);
      }
    };
    animate();
  }
}
