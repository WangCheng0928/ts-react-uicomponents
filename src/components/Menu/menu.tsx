import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

export type MenuMode = 'vertical' | 'horizontal'
type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
  className?: string
  defaultIndex?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelected?: SelectCallback
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index?: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    defaultIndex,
    children,
    onSelected,
    defaultOpenSubMenus,
  } = props
  const [currentIndex, setCurrent] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  useEffect(() => {
    console.log(children?.toString())
  })

  const handleClick = (index: string) => {
    console.log(3)
    setCurrent(index)
    if (onSelected) {
      console.log(4)
      onSelected(index)
    }
  }

  const MenuContextProps: IMenuContext = {
    index: currentIndex ? currentIndex : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus: defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error(
          'warning: menu has a child which is not menuItem component'
        )
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={MenuContextProps}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu
