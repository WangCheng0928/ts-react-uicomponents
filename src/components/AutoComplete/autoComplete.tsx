import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react'
import Input, { InputProps } from '../input/input'
import classNames from 'classnames'
import Icon from '../icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  //这个函数用来给用户自定义，input下拉框怎么匹配，目前是传入一个字符串，返回一个数组
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]> //promise用于处理异步请求
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement | null
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  //我们需要实时拿到用户的输入值，存到当前的state中，然后作出相应的逻辑
  const [inputValue, setInputValue] = useState(value)
  //用户（使用组件的人）将自定义的筛选函数传过来，我们将值inputvalue传给函数，将得到的结果进行封装显示，
  // 所以需要这个state来存储用户自定义函数返回的结果。
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debouncedValue = useDebounce(inputValue, 500)
  const triggerSearch = useRef(false)
  const componentRef = useRef(null)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue as string)
      if (results instanceof Promise) {
        console.log('triggered')
        setLoading(true)
        results
          .then((data) => {
            setLoading(false)
            setSuggestions(data)
          })
          .catch((e) => {
            setLoading(false)
            setSuggestions([{ value: '请求超时' }])
          })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [fetchSuggestions, debouncedValue])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      //回车键
      case 13:
        if (suggestions[highlightIndex])
          handleSelect(suggestions[highlightIndex])
        break
      //上
      case 38:
        highlight(highlightIndex - 1)
        break
      //下
      case 40:
        highlight(highlightIndex + 1)
        break
      //esc
      case 27:
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropDown = () => {
    return (
      <ul className="suggestions">
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'item-highlighted': index === highlightIndex,
          })
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        {...restProps}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      ></Input>
      {loading && (
        <ul>
          <Icon icon="spinner" spin></Icon>
        </ul>
      )}
      {suggestions.length > 0 && generateDropDown()}
    </div>
  )
}

export default AutoComplete
