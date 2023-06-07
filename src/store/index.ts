// 创建store
import { createStore, applyMiddleware, AnyAction } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { ThunkAction } from 'redux-thunk'
import { HomeAction } from './reducers/home'
import { LoginAction } from './reducers/login'
import { ProfileAction } from './reducers/profile'
// 参数1: reducer
// 参数2: 指定 state 的初始值
// 参数3: 中间件
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>

export type RootAction = HomeAction | LoginAction | ProfileAction

export type RootThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  RootAction
>

export default store
