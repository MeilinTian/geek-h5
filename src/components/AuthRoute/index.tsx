// import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { hasToken } from '../../utils/storage'

interface Props extends RouteProps {
  component: any
}

export default function AuthRoute({ component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (hasToken()) {
          return <Component></Component>
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location.pathname },
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
