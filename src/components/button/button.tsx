import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

// button的props
interface BaseButtonProps {
  className?: string
  /** 设置Button的禁用 */
  disabled?: boolean
  /** 设置Button的类型 */
  btnType?: ButtonType
  /** 设置Button的尺寸 */
  size?: ButtonSize
  children: React.ReactNode
  href?: string
}

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>
type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 *
 * #### Button组件是最常见的组件之一，用于开始一个即使操作
 * ##### 引用方式
 *
 * ~~~js
 * import { Button } from 'north-embankment-ui'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const { btnType, size, children, disabled, href, ...restPropps } = props

  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  })

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restPropps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restPropps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button
