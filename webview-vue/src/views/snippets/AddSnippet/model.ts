import type { Rule } from "ant-design-vue/es/form/interface";
import { reactive } from "vue";

export const useModel = () => {
  const formState = reactive({
    tips: "", // 提示
    prefix: "", // 前缀
    body: "", // 内容
    description: "", // 描述
  });

  // 规则
  const rules: Record<string, Rule[]> = reactive({
    tips: [{ required: true, message: "请输入提示" }],
    prefix: [{ required: true, message: "请输入前缀" }],
    body: [{ required: true, message: "请输入内容" }],
    description: [{ required: true, message: "请输入描述" }],
  });
  return { formState, rules };
};

export type Model = ReturnType<typeof useModel>;
