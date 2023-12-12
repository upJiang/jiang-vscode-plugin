import { callVscode } from "@/utils/vscodeUtils";

import { Model } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  onSubmit() {
    callVscode({
      cmd: "addSnippets",
      data: {
        ...this.model.formState,
      },
    });
  }
}
