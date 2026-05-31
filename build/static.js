const fs=require('fs')
const html=require('child_process').execSync('ENV=PROD sptc "server/index.s?uri=/index/ssr"').toString()
const gitioHtml=html.replace(/\/assets\/app\/|crossorigin=/g, '')
fs.writeFileSync(__dirname+'/../server/public/app/index.html', gitioHtml)
const {js, css}=require(__dirname+'/../server/public/app/assets.json')
function rep(fn, pattern, dest) {
  fs.writeFileSync(fn, fs.readFileSync(fn, 'utf8').replace(pattern, dest))
}
rep(__dirname+'/../server/public/app/'+js[0], '/assets/app/', '')
rep(__dirname+'/../server/public/app/'+css[0], '/assets/app/', '')
rep(__dirname+'/../server/public/app/'+css[0], /url\("\/\//g, 'url("https://')

const archiver = require('archiver')
const appDir = __dirname + '/../server/public/app'
const output = fs.createWriteStream(__dirname + '/../dist.zip')
const archive = new archiver.ZipArchive('zip', {zlib: {level: 9}})

archive.pipe(output)
archive.file(appDir + '/index.html', {name: 'index.html'})
archive.directory(appDir + '/client', 'client')
archive.finalize()
