import React, {
  useContext,
  FunctionComponentElement,
  useState,
  FC,
} from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface ISubmenuProps {
  /**submenu的menuItem */
  index?: string
  /**设置submenu的className */
  className?: string
  /** 设置submenu的名称 */
  title?: string
}

/** SubMenu组件和Menu组件一起使用，作为其子组件
 * #### reference methods
 * ~~~
 * import { SubMenu } from 'north-embankment-ui'
 * ~~~
 */
export const SubMenu: FC<ISubmenuProps> = (props) => {
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
      <Transition show={menuOpen} classNames="zoom-in-top">
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
