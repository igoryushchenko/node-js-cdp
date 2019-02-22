import * as fs from 'fs'
import * as syspath from 'path'
import * as csvjson from 'csvjson'

class Importer {

  constructor () {

  }

  import (path) {
    return new Promise((resolve) => {
      resolve (this.importSync(path))
    })
  }

  importSync (path) {
    const fileList = fs.readdirSync(path)
    let result = []
    for (let file of fileList){
      let data = fs.readFileSync(syspath.join(path, file), { encoding : 'utf8'});
      result.push(csvjson.toObject(data));
    }
    return result

  }

}

export default Importer