const commander = require('commander')
const trough = require('through2')
const fs = require('fs')
const syspath = require('path')
const csvjson = require('csvjson')

function reverse() {
  process.stdin.setEncoding('utf8')

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk !== null) {
      process.stdout.write(`data: ${chunk}`)
    }
  })

  process.stdin.on('end', () => {
    process.stdout.write('end')
  })
}

function transform() {
  const transformStream = trough(write, end);
  process.stdin.pipe(transformStream).pipe(process.stdout);
}

function write (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end (done) {
  done();
}

function outputFile (filePath) {
  if (fs.existsSync(filePath)) {
    const stream = fs.createReadStream(filePath)
    stream.pipe(process.stdout);
  } else {
    printError()
  }
}

function convertFromFile(filePath) {
  if (fs.existsSync(filePath) && filePath.endsWith('.csv')){
    const read = fs.createReadStream(filePath)
    const toObject = csvjson.stream.toObject()
    const stringify = csvjson.stream.stringify()
    read.pipe(toObject).pipe(stringify).pipe(process.stdout)
  } else {
    printError()
  }
}

function convertToFile(filePath) {
  if (fs.existsSync(filePath) && filePath.endsWith('.csv')){
    const read = fs.createReadStream(filePath)
    const write = fs.createWriteStream(filePath.replace('.csv', '.json'))
    const toObject = csvjson.stream.toObject()
    const stringify = csvjson.stream.stringify()
    read.pipe(toObject).pipe(stringify).pipe(write)
  } else {
    printError()
  }
}

function cssBundler(path) {
  if (fs.existsSync(path)) {
    fs.readdir(path, function (err, files) {
      if (err) {
        console.log('Error reading directory ' + path)
        console.log(err)
        return
      }
      const write = fs.createWriteStream(syspath.join(path, 'bundle.css'))
      for (let file of files) {
        let data = fs.readFileSync(syspath.join(path, file), { encoding: 'utf8' })
        write.write(data)
      }

      let finalData = fs.readFileSync('nodejs-homework3.css', { encoding: 'utf8' })
      write.write(finalData)

      write.end()
    })
  }
}

function printError () {
  console.log('Invalid arguments! Please use --help key to see usage!')
}

commander.version('0.0.1')
  .option('-a, --action [value]', 'Action to be performed')
  .option('-f, --file [path]', 'Optional: path to file for action')
  .option('-p, --path [path]', 'Optional: path to css files')
  .parse(process.argv)


if (!process.argv.slice(2).length) {
  commander.outputHelp()
}

if (commander.action === 'reverse') {
  reverse()
} else if (commander.action === 'transform') {
  transform()
} else if (commander.action === 'outputFile' && commander.file) {
  outputFile(commander.file)
} else if (commander.action === 'convertFromFile' && commander.file) {
  convertFromFile(commander.file)
} else if (commander.action === 'convertToFile' && commander.file) {
  convertToFile(commander.file)
} else if (commander.action === 'cssBundler' && commander.path) {
  cssBundler(commander.path)
} else {
  printError()
}
