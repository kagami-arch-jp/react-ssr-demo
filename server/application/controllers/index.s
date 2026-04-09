<?js

class indexController{
  init() {
  }
  async ssrAction() {
    const ssr=new LibSSR
    await ssr.render(__DISABLE_SSR__)
    return readEchoed()
  }
  async assetsAction() {
    const fn='/'+$_REQUEST_FILE['subRoute'][1]
    const path=require('path')
    const fs=require('fs')

    const _fn=__WWW_DIR__+'/'+path.resolve(fn)

    const m=new Date(fs.statSync(_fn).mtime).toUTCString()
    setResponseHeaders({'last-modified': m})
    if($_RAW_REQUEST['headers']['if-modified-since']===m) {
      setStatus(304, 'not modified')
      return
    }

    sendFile(_fn, {
      'expires': 'Sun, 09 Dec 2035 09:13:56 GMT',
    })

  }
  finish(err, ret='') {
    if(!err) {
      echo(ret)
      return
    }
    echo(isDebug()? err.stack: 'failed to handle this request')
  }
}
