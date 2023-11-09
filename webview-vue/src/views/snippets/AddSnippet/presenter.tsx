import Service from './service'
import { useModel } from './model'
import { callVscode } from '@/utils/vscodeUtils'

export const usePresenter = () => {
  const model = useModel()
  const service = new Service(model)

  // 添加代码片段
  const handleAddSnippets = () => {
    callVscode({
      cmd: 'addSnippets',
      data: {
        tips: '测试jiang代码片段',
        prefix: 'jiang',
        body: '<div>1111</div>',
        description: '江的测试代码片段',
      },
    })
  }

  return {
    model,
    service,
    handleAddSnippets,
  }
}
