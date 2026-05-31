import React from 'react'

import './App.scss'

import {sharedCounter} from '@/store/app'

import {fetch} from '@/utils/fetch'

async function getData() {
  return fetch('/app/randomNumber', {num: Math.floor(Math.random()*1e4)})
}

export async function init(payload: any) {
  payload=payload || await getData()
  sharedCounter.setValue(payload)
  return payload
}

export function headerString(payload: any) {
  return `<title>react-ssr-demo</title>
  <meta name="generator" content="https://github.com/kagami-arch-jp/react-ssr-demo/"/>
  <meta name="description" content="This project is an empty React SSR scaffold, which can be directly extended with frontend features (React 19) and backend features (Node.js v22)."/>
  `
}

export default function() {
  const num=sharedCounter.useValue()
  const [r, setR]=React.useState(num)
	return <div onClick={()=>{
    setR((oldR: number)=>{
      console.log(oldR)
      return oldR+1
    })
  }}>Simple Demo {r}</div>
}
