import React, {
  InputHTMLAttributes,
  ReactElement,
  FC,
  ChangeEvent,
} from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用Input */
  disabled?: boolean
  /**设置 input大小，支持lg或者是sm */
  size?: InputSize
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /**添加前缀 用于配置一些固定组合 */
  pretend?: string | ReactElement
  /** 添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input 输入框 通过鼠标或键盘输入内容， 是最基本的表单组件
 * ~~~js
 *  引用方式
 *  import { Input } from 'north-embankment-ui'
 * ~~~
 * 支持 HTMLInput的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
  //取出各种属性
  const {
    disabled,
    size,
    icon,
    pretend,
    append,
    style,
    children,
    ...restProps
  } = props
  //根据属性得到className
  const classes = classNames('input', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': pretend || append,
    'input-group-append': !!append,
    'input-group-pretend': !!pretend,
  })

  const fixControllValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControllValue(props.value)
  }

  return (
    //根据属性判断是否要添加特定的节点
    <div className={classes} style={style}>
      {pretend && <div className="input-group-pretend">{pretend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon}></Icon>
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...restProps}>
        {children}
      </input>
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

Input.defaultProps = {
  disabled: false,
}

export default Input
