// 创建store
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
// 参数1: reducer
// 参数2: 指定 state 的初始值
// 参数3: 中间件
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
