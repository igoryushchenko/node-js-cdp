import fs from 'fs'
import syspath from 'path'
import EventEmitter from 'events'

class DirWatcher extends EventEmitter {
  watch (path, delay) {
    let monitoredFiles = []
    let currentFiles = []
    let _this = this

    setInterval(function () {
      if (fs.existsSync(path)) {
        console.log('Watching directory ... ' + path)
        fs.readdir(path, function (err, files) {
          if (err) {
            console.log('Error reading directory ' + path)
            console.log(err)
            return
          }

          currentFiles = []
          for (let file of files) {
            let fileStats = fs.statSync(syspath.join(path, file))
            currentFiles.push([file, fileStats.size])
          }

          if (monitoredFiles.length === 0 && currentFiles.length !== 0){
            _this.emit('dirwatcher:changed')
            monitoredFiles = currentFiles.slice()
            console.log('changed - new')
          } else if (monitoredFiles.length !== currentFiles.length) {
            _this.emit('dirwatcher:changed')
            monitoredFiles = currentFiles.slice()
            console.log('changed - added/removed file')
          } else {
            for (let i = 0; i < monitoredFiles.length; i++) {
              if (monitoredFiles[i][1] !== currentFiles[i][1]) {
                // size changed
                _this.emit('dirwatcher:changed')
                monitoredFiles = currentFiles.slice()
                console.log('changed - size')
              }
            }
          }
        })
      }
    }, delay)
  }
}

export default DirWatcher
