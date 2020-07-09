import React from 'react'
import { CSSTransition } from 'react-transition-group'

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right'

interface TransitionProps {
  animation?: AnimationName
  classNames?: string
  show: boolean
}

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, show, ...restProps } = props

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      timeout={300}
      unmountOnExit={true}
      appear={true}
      in={show}
      {...restProps}
    >
      {children}
    </CSSTransition>
  )
}

export default Transition
