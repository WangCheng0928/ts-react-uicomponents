import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from './button'

export default {
  component: Button,
  title: 'Button组件',
}

export const DefaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)
DefaultButton.story = {
  name: 'Button',
}

export const ButtonWithSize = () => (
  <>
    <Button size="lg" onClick={action('clicked')}>
      large button
    </Button>
    <Button size="sm" onClick={action('clicked')}>
      small button
    </Button>
  </>
)
ButtonWithSize.story = {
  name: '不同尺寸的Button',
}

export const ButtonWithType = () => (
  <>
    <Button btnType="primary" onClick={action('clicked')}>
      primary button
    </Button>
    <Button btnType="danger" onClick={action('clicked')}>
      danger button
    </Button>
    <Button
      btnType="link"
      href="https://google.com"
      target="_blank"
      onClick={action('clicked')}
    >
      link button
    </Button>
  </>
)

ButtonWithType.story = {
  name: '不同类型的Button',
}
