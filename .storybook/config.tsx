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
  },
})
const loaderFn = () => {
  // require('../src/welcome.stories.tsx')
  // require('../src/components/Button/button.stories.tsx')
  // require('../src/components/Menu/menu.stories.tsx')
  // require('../src/components/Input/input.stories.tsx')
  // require('../src/components/AutoComplete/autoComplete.stories.tsx')
  // require('../src/components/Upload/upload.stories.tsx')
  const allExports = [require('../src/welcome.stories.tsx')]
  const req = require.context('../src/components', true, /\.stories\.tsx$/)
  req.keys().forEach((fname) => req(fname))
  return allExports
}

configure(loaderFn, module)
