import { useState, useEffect } from 'react'

//这个hook用于函数防抖，也就是说只有在input某个时间内不再变化时，才去执行某个函数操作
//也就是说上层input改变时，如果delay事件内没变化时，，就把输入的input返回回去，如果delay事件内改变了，hook
//重新执行，首先会清除之前的delay状态，然后重新渲染
function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce
