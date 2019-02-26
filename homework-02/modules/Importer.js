import fs from 'fs'
import syspath from 'path'
import csvjson from 'csvjson'

class Importer {
  import (path) {
    return new Promise((resolve) => {
      resolve(
          fs.readdir(path, function (err, files) {
              if (err) {
                  console.log(err)
                  return
              }

              let result = []

              files.filter((each) => each.endsWith('.csv')).forEach((csvFile) => {
                  let data = fs.readFileSync(syspath.join(path, csvFile), { encoding: 'utf8' })
                  result.push(csvjson.toObject(data))
              })
              return result
          })
      )
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
