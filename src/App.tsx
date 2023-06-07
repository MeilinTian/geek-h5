import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './utils/history'
import './App.scss'
import Login from './pages/Login'
import Home from './pages/Layout'
import ProfileEdit from './pages/Profile/Edit'
import Chat from './pages/Profile/Chat'
import AuthRoute from './components/AuthRoute'
import NotFound from './pages/NotFound'
import Feedback from './pages/Profile/Feedback'
import Search from './pages/Search'

export default function App() {
  return (
    // 注意： BrowserRouter 等价于 Router history={history}
    <Router history={history}>
      <div className="app">
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/search" component={Search}></Route>
          {/* 需要登录才能访问 */}
          <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
          <AuthRoute path="/profile/chat" component={Chat}></AuthRoute>
          <AuthRoute path="/profile/feedback" component={Feedback}></AuthRoute>
          {/* 404 */}
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  )
}
