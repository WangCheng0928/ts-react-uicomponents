import React from 'react'
import AutoComplete, { DataSourceType } from './autoComplete'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

interface githubApiProps {
  name?: string
  url?: string
}

const SimpleComplete = () => {
  // const lakers = [
  //   'bradley',
  //   'pope',
  //   'caruso',
  //   'cook',
  //   'cousins',
  //   'james',
  //   'AD',
  //   'greem',
  //   'howard',
  //   'kuzma',
  //   'McGee',
  //   'rando',
  // ]

  // const lakersWithNumber = [
  //   { value: 'bradley', number: 11 },
  //   { value: 'pope', number: 1 },
  //   { value: 'caruso', number: 4 },
  //   { value: 'cook', number: 2 },
  //   { value: 'cousins', number: 15 },
  //   { value: 'james', number: 23 },
  //   { value: 'AD', number: 3 },
  //   { value: 'greem', number: 14 },
  //   { value: 'howard', number: 39 },
  //   { value: 'kuzma', number: 0 },
  // ]
  // const handleFetch = (query: string) => {
  //   return lakers
  //     .filter((name) => name.includes(query))
  //     .map((player) => ({ value: player }))
  // }

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log('1111', items)
        const formatItems = items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }))
        return formatItems
      })
  }

  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter((player) => player.value.includes(query))
  // }

  const renderOption = (item: DataSourceType<githubApiProps>) => {
    if (item.value === '请求超时') {
      return <h2 className="network-error">服务器网络错误</h2>
    }
    return (
      <>
        <h2>Name: {item.value}</h2>
        <p>url: {item.url}</p>
      </>
    )
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
      style={{ width: '500px' }}
      placeholder="请输入关键字"
    ></AutoComplete>
  )
}

storiesOf('AutoComplete组件', module).add('AutoComplete', SimpleComplete)
