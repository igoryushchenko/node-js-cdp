import fs from 'fs'
import syspath from 'path'
import csvjson from 'csvjson'

class Importer {
  import (path) {
    // let result = []
    let promise = new Promise((resolve, reject) => {
      fs.readdir(path, function (err, files) {
        if (err) {
          console.log(err)
          return
        }

        files.filter((each) => each.endsWith('.csv'))
        resolve(files)
      })
    })

    return promise.then(csvFiles => {
      return new Promise((resolve, reject) => {
        let jsonData = []
        csvFiles.forEach(csvFile => {
          let data = fs.readFileSync(syspath.join(path, csvFile), { encoding: 'utf8' })
          jsonData.push(csvjson.toObject(data))
        })
        resolve(jsonData)
      })
    })
  }

  importSync (path) {
    let result = []
    fs.readdirSync(path).filter((each) => each.endsWith('.csv')).forEach((csvFile) => {
      let data = fs.readFileSync(syspath.join(path, csvFile), { encoding: 'utf8' })
      result.push(csvjson.toObject(data))
    })
    return result
  }
}

export default Importer
