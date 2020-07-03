import React from 'react'
import Button from './components/button/button'
import { ButtonType, ButtonSize } from './components/button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>hello</Button>
        <Button disabled={true}>Disabled Button</Button>
        <Button
          size={ButtonSize.Large}
          btnType={ButtonType.Primary}
          onClick={() => {
            alert(123)
          }}
        >
          Large Primary
        </Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Danger}>
          Small Danger
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
          target="_blank"
        >
          Baidu Link
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
          disabled={true}
        >
          Disabled Link
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
