import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from 'src/components/App'
import store from 'src/store'

const rootElement = document.getElementById('app')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
