import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import '../src/styles/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core' // 刚开始storybook中无法找到fontawesome图标，引入之后就可以找到了
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const styles: React.CSSProperties = {
  padding: '20px 40px',
}

const storyDecorators = (storyFn: any) => <div style={styles}>{storyFn()}</div>
addDecorator(storyDecorators)
addDecorator(withInfo)
addParameters({
  info: {
    inline: true,
    header: false,
  },
})

configure(require.context('../src', true, /\.stories\.tsx$/), module)
