import * as ReactDOMClient from 'react-dom/client'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
// 导入通用样式
import './assets/styles/index.scss'

const rootElement = document.getElementById('root')

const root = ReactDOMClient.createRoot(rootElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)