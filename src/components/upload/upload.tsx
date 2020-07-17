import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'
import Button from '../Button/button'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export type UploadTypes = 'btn' | 'textarea'

/**
 * 为了展示上传文件的状态，需要一个interface来设置当前文件的状态，文件列表中每个文件包含的属性即UploadFile
 */
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  /**设置上传服务器地址 */
  action: string
  /**设置默认上传列表 */
  defaultFileList?: UploadFile[]
  /**文件上传前的回调 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**文件正在上传时的回调 */
  onProgress?: (percentage: number, file: File) => void
  /**文件上传成功后的回调 */
  onSucess?: (data: any, file: File) => void
  /**文件上传失败后的回调 */
  onError?: (data: any, file: File) => void
  /**文件上传后的回调，无论成功或失败 */
  onChange?: (file: File) => void
  /**移除文件后的回调 */
  onRemove?: (file: UploadFile) => void
  /**设置上传文件的header */
  header?: { [key: string]: any }
  /**设置上传文件的名称 */
  name?: string
  /**添加上传的数据 */
  data?: { [key: string]: any }
  /**设置是否携带cookie */
  withCredentials?: boolean
  /**设置允许上传的文件的类型 */
  accept?: string
  /**设置是否允许同时上传多个文件 */
  multiple?: boolean
  /**是否允许拖拽文件上传 */
  drag?: boolean
  /**设置Upload组件样式 */
  uploadType?: UploadTypes
}

/**
 * #### Upload组件 用于将本地文件上传到指定服务器
 * ##### 引用方式
 * ~~~js
 *  import { Upload } from 'north-embankment-ui'
 * ~~~
 * 通过uploadTypes属性支持两种上传方式
 */
export const Upload: FC<UploadProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSucess,
    onError,
    onChange,
    onRemove,
    header,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
    uploadType,
  } = props

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    //这里传一个函数是官方文档推荐，因为更新state可能是异步的，可能拿不到当前的状态，而传入函数就可以解决这一问题
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((preList) => {
      return preList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    // 刚上传时给每个上传的文件设置初始状态
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    // setFileList([_file, ...fileList])
    setFileList((preFileList) => {
      return [_file, ...preFileList]
    })
    console.log(fileList)
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...header,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            console.log(1111, fileList)
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((resp) => {
        console.log(resp)
        updateFileList(_file, { status: 'success', response: resp.data })

        if (onSucess) {
          onSucess(resp, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        console.log(err)
        updateFileList(_file, { status: 'error', error: err })

        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  return (
    <div className="upload-component">
      {uploadType === 'btn' ? (
        <div>
          <Button btnType="primary" onClick={handleClick}>
            upload File
          </Button>
          <input
            className="file-input"
            style={{ display: 'none' }}
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept={accept}
            multiple={multiple}
          ></input>
        </div>
      ) : (
        <div
          className="upload-input"
          style={{ display: 'inline-block' }}
          onClick={handleClick}
        >
          {drag ? (
            <Dragger
              onFile={(files) => {
                uploadFiles(files)
              }}
            >
              {children}
            </Dragger>
          ) : (
            children
          )}
          <input
            className="file-input"
            style={{ display: 'none' }}
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept={accept}
            multiple={multiple}
          ></input>
        </div>
      )}

      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
  uploadType: 'btn',
}
export default Upload
