const {getRuntimeArgv, checkEnv, run}=require(__dirname+'/lib')
checkEnv()
const {IS_DEV, IS_BUILD, IS_SERVE}=getRuntimeArgv()

process.env.NODE_ENV=IS_DEV? 'development': 'production'
const {webpackDev, webpackBuild}=require(__dirname+'/webpack.lib')

const open=require('open')
if(IS_DEV) {
  run('sptcd', '-rindex.s -wserver'.split(' '))
  webpackDev()
  open('http://127.0.0.1:3000')
}else if(IS_BUILD) {
  webpackBuild()
}
