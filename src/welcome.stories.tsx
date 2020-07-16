import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到north-embankment-ui 组件库</h1>
        <p>此组件库为个人学习效果展示，欢迎一起交流讨论. qq: 493475850</p>
        <h3>安装方法：</h3>
        <code>npm install north-embankment-ui --save</code>
      </>
    )
  },
  { info: { disable: true } }
)
