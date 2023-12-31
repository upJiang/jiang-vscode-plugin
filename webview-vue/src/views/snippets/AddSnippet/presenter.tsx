import { Form, message } from "ant-design-vue";

import { useModel } from "./model";
import Service from "./service";

const { useForm } = Form;
export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  const { validate, validateInfos, resetFields } = useForm(
    model.formState,
    model.rules,
  );

  // 提交
  const handleOnSubmit = async () => {
    await validate();
    await service.onSubmit();
    message.success("添加成功");
    resetFields();
  };

  return {
    model,
    service,
    handleOnSubmit,
    validateInfos,
  };
};
