import { DirWatcher, Importer } from './modules'
import EventEmitter from 'events'

class MyEmitter extends EventEmitter {}
const eventEmitter = new MyEmitter();

const path = 'data'

const dw = new DirWatcher(eventEmitter)
const im = new Importer()

eventEmitter.on('dirwatcher:changed', () => {
  let data = im.importSync(path)
  console.log('from sync:')
  console.log(data)

  let dataPromise = im.import(path)
  dataPromise.then((jsonData) => {
    console.log('from async: ')
    console.log(jsonData)
  } )
})

dw.watch(path, 5000)


