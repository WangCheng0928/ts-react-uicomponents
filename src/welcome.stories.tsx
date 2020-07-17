import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './components/Button'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到north-embankment-ui 组件库</h1>
        <p>此组件库为个人学习效果展示，欢迎一起交流讨论. qq: 493475850</p>
        <p>此组件完全基于typescript开发，用于react开发的ui库</p>
        <h3>安装方法：</h3>
        <code>npm install north-embankment-ui --save</code>
        <h3>示例:</h3>
        <div className="code-padding">
          <code>import Button from 'north-embankment-ui'</code>
          <br />
          <code>ReactDOM.render( Button , mountNode);</code>
        </div>
        <p>引入样式：</p>
        <code>import 'north-embankment-ui/dist/index.css'</code>
        <h3>TypeScript</h3>
        <p>
          north-embankment-ui使用TypeScript进行书写并提供了完整的定义文件。（不要引用@types/north-embankment-ui）
        </p>
      </>
    )
  },
  { info: { disable: true } }
)
