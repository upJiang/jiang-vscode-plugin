import Service from './service'
import { useModel } from './model'
import { callVscode } from '@/utils/vscodeUtils'

export const usePresenter = () => {
  const model = useModel()
  const service = new Service(model)

  // 添加代码片段
  const handleAddSnippets = () => {
    callVscode({
      cmd: 'addSnippet',
      data: '111',
    })
  }

  return {
    model,
    service,
    handleAddSnippets,
  }
}
