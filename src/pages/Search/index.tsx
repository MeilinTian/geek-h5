import Icon from '../../components/Icon'
import NavBar from '../../components/NavBar'
import classnames from 'classnames'
import { useHistory } from 'react-router'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import {
  getSuggestionList,
  clearSuggestions,
  addSearchList,
  clearHistories,
} from '../../store/actions/search'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

// import { useEffect } from '@testing-library/react/node_modules/@types/react'

const Search = () => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const suggestions = useSelector(
    (state: RootState) => state.search.suggestions
  )
  const histories = useSelector((state: RootState) => state.search.histories)
  const [isSearching, setIsSearching] = useState(false) // 是否显示搜索
  const dispatch: any = useDispatch()
  const timerRef = useRef(-1)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim()
    setKeyword(text)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      // 需要发送请求
      if (text) {
        setIsSearching(true)
        dispatch(getSuggestionList(text))
      } else {
        setIsSearching(false)
      }
    }, 500)
  }
  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current)
    }
  }, [])
  /**
   * 让字符串中的指定内容高亮
   * @param str 字符串
   * @param key 指定内容
   */
  const highlight = (str: string, key: string) => {
    return str.replace(new RegExp(key, 'gi'), (match: string) => {
      return `<span style="color: red">${match}</span>`
    })
  }
  // 清空按钮事件
  const onClear = () => {
    // 清空搜索关键字
    setKeyword('')
    // 设置搜索状态
    setIsSearching(false)
    // 清空 redux 中的数据
    dispatch(clearSuggestions())
  }
  // 搜索事件
  const onSearch = (key: string) => {
    // 保存搜索记录
    if (!key) return
    dispatch(addSearchList(key))
    // 跳转页面
    history.push('/search/result?key=' + key)
  }
  // 清空全部历史记录
  const onClearHistory = () => {
    dispatch(clearHistories())
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        extra={
          <span className="search-text" onClick={() => onSearch(keyword)}>
            搜索
          </span>
        }
      >
        <div className="navbar-search">
          <Icon type="iconbtn_search" className="icon-search" />

          <div className="input-wrapper">
            {/* 输入框 */}
            <input
              type="text"
              placeholder="请输入关键字搜索"
              value={keyword}
              onChange={onChange}
            />

            {/* 清空输入框按钮 */}
            <Icon
              type="iconbtn_tag_close"
              className="icon-close"
              onClick={onClear}
            />
          </div>
        </div>
      </NavBar>

      {/* 搜索历史 */}
      <div
        className="history"
        style={{ display: isSearching ? 'none' : 'block' }}
      >
        <div className="history-header">
          <span>搜索历史</span>
          <span onClick={onClearHistory}>
            <Icon type="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          {histories.map((item, index) => (
            <span
              className="history-item"
              key={index}
              onClick={() => onSearch(item)}
            >
              {index !== 0 && <span className="divider"></span>}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 搜素建议结果列表 */}
      <div className={classnames('search-result', { show: isSearching })}>
        {suggestions.map((item, index) => (
          <div className="result-item" key="index">
            <Icon className="icon-search" type="iconbtn_search" />
            <div
              className="result-value"
              dangerouslySetInnerHTML={{
                __html: highlight(item, keyword),
              }}
              onClick={() => onSearch(item)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
