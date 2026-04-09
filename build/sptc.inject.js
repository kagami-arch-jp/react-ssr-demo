const argv=require('./lib').getRuntimeArgv()

function is_server(ctx) {
  return (ctx.webpackLoaderThis.target + '').indexOf('node') > -1;
}

const watches={}, watchListeners={}
function autoTouchByChanges(touchFile, watchFiles) {
  if(!argv.IS_DEV) return;
  const fs=require('fs')
  for(let fn of watchFiles) {
    watches[fn]=watches[fn] || new Set
    watches[fn].add(touchFile)
  }
  for(let fn in watches) {
    if(watchListeners[fn]) continue
    watchListeners[fn]=true
    fs.watch(fn, _=>{
      for(let t of watches[fn].keys()) {
        fs.utimesSync(t, new Date(), new Date())
      }
    })
  }
}

const A={
  EXTENDS: (ctx) => ({
    ...argv,
    IS_NODE_TARGET: is_server(ctx),
    SRC: __dirname+'/../src',
    autoTouchByChanges,
  }),
  TPLS: [
    /\.jsx?$/, ctx=>{
      let adds={}
      let str=ctx.str.replace(/\*IMG\((['"])(.+?)\1\)/g, (_, a, pth)=>{
        let e='IMG_'+pth.replace(/[^a-z\d_]+/g, '_')
        adds[e]=pth
        return e
      })
      for(let e in adds) {
        str=`import ${e} from '${adds[e]}'\n`+str
      }
      return str
    },

    /\.(scss|jsx?)/, ctx=>{
      const {str, fn}=ctx
      const path=require('path')
      const src=path.resolve(__dirname+'/src')
      const ffn=path.resolve(fn).substr(src.length).replace(/\.[a-z\d]+$/, '')
      let t=ffn.replace(/[\/\\]+([^/\\]+)\.[^/\\]+$/, '').replace(/[^a-z\d_-]/ig, '_')
      return str.replace(/\b__view_scope\b/g, 'V_'+argv.RND+'_'+t)
    },

  ],
};

module.exports=A
