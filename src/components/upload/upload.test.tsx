import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'
import axios from 'axios'
import Upload, { UploadProps } from './upload'

// jest.mock('../icon/icon', () => {
//   return ({ icon:, onClick }) => {
//     return <span onClick={onClick}>{icon}</span>
//   }
// })
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSucess: jest.fn(),
  onChange: jest.fn(),
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(
      <Upload uploadType="textarea" {...testProps}>
        Click to upload
      </Upload>
    )
    fileInput = wrapper.container.querySelector(
      '.file-input'
    ) as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLLIElement
  })
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: 'cool' })
    // })
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    // expect(queryByText('spinner')).toBeInTheDocument()
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    // expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSucess).toHaveBeenCalled()
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    //remove the upload file
    // expect(queryByText('times')).toBeInTheDocument()
    // fireEvent.click(queryByText('times') as HTMLLIElement)
    // expect(queryByText('test.png')).not.toBeInTheDocument()
  })
  it('drag and drop files should works fine', () => {
    fireEvent.dragOver(uploadArea)
    // expect(uploadArea).toHaveClass('is-dragOver')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragOver')
  })
})
