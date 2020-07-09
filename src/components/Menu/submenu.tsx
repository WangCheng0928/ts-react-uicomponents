import React, { useContext, FunctionComponentElement, useState } from 'react'
import classNames from 'classnames'
import { MenuMode, MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../icon/icon'
import Transition from '../transition/transition'

interface ISubmenuProps {
  index?: string
  className?: string
  mode?: MenuMode
  title?: string
}

const SubMenu: React.FC<ISubmenuProps> = (props) => {
  const context = useContext(MenuContext)
  const { index, title, className, children } = props
  const openedSubMenu = context.defaultOpenSubMenus as Array<String>
  const isOpened =
    index && context.mode === 'vertical' ? openedSubMenu.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'is-actived': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  })

  //设置鼠标点击事件触发
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  const clickEvents =
    context.mode === 'vertical' ? { onClick: handleClick } : {}
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleHover(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleHover(e, false)
          },
        }
      : {}

  const renderChildren = () => {
    const subMenuClass = classNames('submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error(
          'warning: submenu has a child which is not menuItem component'
        )
      }
    })
    return (
      <Transition show={menuOpen} classNames="zoom-in-bottom">
        <ul className={subMenuClass}>{childrenComponent}</ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon theme="dark" icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
