import * as fs from 'fs'
import * as syspath from 'path'

class DirWatcher {

  constructor (eventEmitter) {
    this._eventEmitter = eventEmitter
  }

  watch (path, delay) {
    console.log('Watching directory ... ' + path)
    let monitoredFiles = []
    const eventEmitter = this._eventEmitter
    setInterval( function () {
      fs.readdir(path, function (err, files) {

        let currentFiles = []

        for (let file of files){
          let fileStats = fs.statSync (syspath.join(path, file))
          currentFiles.push([file,fileStats.size])
        }

        if (monitoredFiles.length === 0 && currentFiles.length !== 0){
          eventEmitter.emit('dirwatcher:changed');
          monitoredFiles = currentFiles.slice()
          console.log('changed - new')
        } else if (monitoredFiles.length !== currentFiles.length) {
          eventEmitter.emit('dirwatcher:changed');
          monitoredFiles = currentFiles.slice()
          console.log('changed - added/removed file')
        } else {
          for (let i = 0; i < monitoredFiles.length; i++) {
            if (monitoredFiles[i][1] !== currentFiles[i][1]) {
              //size changed
              eventEmitter.emit('dirwatcher:changed');
              monitoredFiles = currentFiles.slice()
              console.log('changed - size')
            }
          }
        }
      })

    }, delay)
  }
}

export default DirWatcher
