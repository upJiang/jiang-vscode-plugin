import { useModel } from "./model";
import Service from "./service";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  const sendMessage = () => {
    if (model.userInput.value) {
      model.messages.value.push({ text: model.userInput.value, type: "user" });
      service.askQuestion();
      model.userInput.value = "";

      // Simulate a response from the robot (replace with actual logic)
      // setTimeout(() => {
      //   const response = "This is a simulated response from the robot.";
      //   model.messages.value.push({ text: response, type: "robot" });
      // }, 500);
    }
  };
  return {
    model,
    service,
    sendMessage,
  };
};
