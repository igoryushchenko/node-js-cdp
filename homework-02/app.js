import { DirWatcher, Importer } from './modules'

const path = 'data'

const dw = new DirWatcher()
const im = new Importer()

dw.on('dirwatcher:changed', () => {
  let data = im.importSync(path)
  console.log('from sync:')
  console.log(data)

  let dataPromise = im.import(path)
  dataPromise.then((jsonData) => {
    console.log('from async: ')
    console.log(jsonData)
  })
})

dw.watch(path, 5000)


