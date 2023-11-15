import { reactive, ref } from "vue";

export const useModel = () => {
  const name = ref("vue-mvp");
  return { name };
};

export type Model = ReturnType<typeof useModel>;
