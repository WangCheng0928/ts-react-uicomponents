import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { ISubmenuProps } from './submenu'
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<ISubmenuProps>
}

const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
