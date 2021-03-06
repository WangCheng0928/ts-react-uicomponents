import { RefObject, useEffect } from 'react'

//传入一个ref 指代html节点，如果传入的ref.current为空或者直接点击到了传入的组件内部则直接返回
//否则通过回调函数处理点击事件
function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  })
}

export default useClickOutside
