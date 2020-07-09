import React from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  wait,
} from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMebnu from './submenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelected: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: '0',
}

const styleElmentFile = () => {
  const cssFile: string = `.submenu {
    display: none
  }
  .submenu.menu-opened {
    display: block
  }`
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

beforeEach(() => {
  wrapper = render(
    <Menu {...testProps}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled={true}>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMebnu title="test-submenu">
        <MenuItem>drop1</MenuItem>
      </SubMebnu>
    </Menu>
  )
  wrapper.container.append(styleElmentFile())
  menuElement = wrapper.getByTestId('test-menu')
  activeElement = wrapper.getByText('active')
  disabledElement = wrapper.getByText('disabled')
})
describe('test menu and MunuItem component', () => {
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4) //:scope 重新定位参考点
    expect(activeElement).toHaveClass('menu-item is-actived')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toBeInTheDocument()
    expect(thirdItem).toHaveClass('menu-item is-actived')
    expect(activeElement).not.toHaveClass('is-actived')
    expect(testProps.onSelected).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-actived')
    expect(testProps.onSelected).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(
      <Menu {...testVerProps}>
        <MenuItem>active</MenuItem>
        <MenuItem disabled={true}>disabled</MenuItem>
        <MenuItem>xyz</MenuItem>
      </Menu>
    )
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu menu-vertical')
  })

  it('should show dropdown items when hover on menu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropDownElement = wrapper.getByText('test-submenu')
    fireEvent.mouseEnter(dropDownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelected).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropDownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
})
