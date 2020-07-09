import React from 'react'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/submenu'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu mode="vertical" defaultOpenSubMenus={['3']}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled={true}>cool link 2</MenuItem>
          <MenuItem>cool link 3</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
        </Menu>
      </header>
    </div>
  )
}

export default App
