import React from 'react'
import App, * as app from './App'

export async function init(payload) {
  const r='init'
  return app?.[r]?.(payload) || null
}

#ifndef IS_NODE_TARGET

import ReactDOM from 'react-dom/client'
import './App.scss'
const appRoot=document.querySelector('.app')
const {payload, degradeCsr}=window.__ssrData__ || {}

;(async _=>{
  if(degradeCsr) {
    await init()
    ReactDOM.createRoot(appRoot).render(<App />)
  }else{
    await init(payload)
    ReactDOM.hydrateRoot(appRoot, <App />)
  }
})()

#else

// server
import Server from 'react-dom/server'

export function renderToString() {
  return Server.renderToString(<App />)
}

#endif
