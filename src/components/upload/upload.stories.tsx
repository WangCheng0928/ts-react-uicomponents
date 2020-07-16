import React from 'react'
import Upload, { UploadFile } from './upload'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Upload',
  component: Upload,
}

const defaultFileList: UploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'uploading',
    percent: 30,
  },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'abc.md', status: 'error', percent: 30 },
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 600) {
    alert('file too big')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}

export const SimpleUpload = () => {
  return (
    <Upload
      action="http://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      onProgress={action('onProgress')}
      onRemove={action('onRemove')}
      multiple={true}
      drag={true}
    >
      click or drag to upload
    </Upload>
  )
}
