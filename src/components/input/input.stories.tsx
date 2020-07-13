import React, { useState } from 'react'
import Input from './input'
import { action } from '@storybook/addon-actions'

const ControlledInput = () => {
  const [value, setValue] = useState('')
  return (
    <Input
      value={value}
      defaultValue="ControlledInput"
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
}

export default {
  title: 'Input Component',
  component: Input,
}

export const defaultInput = () => (
  <>
    <Input
      style={{ width: '300px' }}
      placeholder="请输入文本"
      onChange={action('changed')}
    ></Input>
    <ControlledInput />
  </>
)
defaultInput.story = {
  name: 'Input',
}

export const sizeInput = () => (
  <>
    <Input style={{ width: '300px' }} size="lg" defaultValue="large size" />
    <Input style={{ width: '300px' }} size="sm" defaultValue="small size" />
  </>
)
sizeInput.story = {
  name: '大小不同的Input',
}

export const disabledInput = () => (
  <Input
    style={{ width: '300px' }}
    defaultValue="disabled input"
    disabled={true}
  />
)
disabledInput.story = {
  name: '被禁用的Input',
}

export const iconInput = () => (
  <Input style={{ width: '300px' }} defaultValue="icon input" icon={'search'} />
)
iconInput.story = {
  name: '带图标的Input',
}

export const pendInput = () => (
  <>
    <Input
      style={{ width: '300px' }}
      defaultValue="pretend text"
      pretend="https://"
    ></Input>
    <Input
      style={{ width: '300px' }}
      defaultValue="google"
      append=".com"
    ></Input>
  </>
)
pendInput.story = {
  name: '带前后缀的Input',
}
