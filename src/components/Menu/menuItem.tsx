import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  disabled?: boolean
  index?: string
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-actived': context.index === index,
  })

  const handleClick = () => {
    console.log(1)
    if (context.onSelect && !disabled && typeof index === 'string') {
      console.log(2)
      context.onSelect(index)
    }
    // alert(index)
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  disabled: false,
}
// we can use "displayName" on component to change its component tag on dev tools
MenuItem.displayName = 'MenuItem'

export default MenuItem
