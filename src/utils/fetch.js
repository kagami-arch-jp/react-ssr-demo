
function clientFetch(action, data) {
  if("@IS_DEV") {
    action=location.origin+action
  }
  return window.fetch(action, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    mode: 'cors',
    body: JSON.stringify(data),
    credentials: 'include',
  })
}

#ifndef IS_NODE_TARGET
import {sleep} from './base'

const FETCH_TIMEOUT=10e3

async function _fetch(action, data) {
  const ret=await Promise.race([
    clientFetch(action, data),
    sleep(FETCH_TIMEOUT).then(_=>new Error('Network hung up')),
  ])
  return await ret.json()
}

#else

function _fetch(action, data) {
  return callServerApi(action, data)
}

#endif

export async function fetch(action, data) {
  try{
    const ret=await _fetch(action, data)
    if(!ret.success) throw new Error(ret.errMsg)
    return ret.data
  }catch(e) {
    throw e
  }
}
