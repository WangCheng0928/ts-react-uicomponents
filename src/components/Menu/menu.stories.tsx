import React from 'react'
import Menu from './menu'
import Submenu from './submenu'
import MenuItem from './menuItem'

export default {
  title: 'Menu组件',
}

export const MenuInfo = () => (
  <>
    <Menu mode="horizontal" defaultOpenSubMenus={['3']}>
      <MenuItem>link start1</MenuItem>
      <MenuItem disabled>link start2</MenuItem>
      <MenuItem>link start3</MenuItem>
      <Submenu title="dropdown">
        <MenuItem>down-link1</MenuItem>
        <MenuItem>down-link2</MenuItem>
      </Submenu>
    </Menu>
    <Menu mode="vertical" defaultOpenSubMenus={['3']}>
      <MenuItem>link start1</MenuItem>
      <MenuItem disabled>link start2</MenuItem>
      <MenuItem>link start3</MenuItem>
      <Submenu title="dropdown">
        <MenuItem>down-link1</MenuItem>
        <MenuItem>down-link2</MenuItem>
      </Submenu>
    </Menu>
  </>
)
