// import commander from 'commander'
const commander = require('commander')
​const through​ =​ require('through2'​)

function reverse (str) {
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

function transform (str) {
  console.log('transform')
}

function outputFile (filePath) {
  console.log('outputFile')
}

function convertFromFile (filePath) {
  console.log('convertFromFile')
}

function convertToFile (filePath) {
  console.log('convertToFile')
}

function cssBundler (path) {
  console.log('cssBundler')
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
  reverse('1')
} else if (commander.action === 'transform') {
  transform('2')
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

// === Terminal ===
// ./streams.js --action=outputFile --file=users.csv
// ./streams.js --action=transformToFile --file=users.csv
// ./streams.js --action=transform textToTransform
// ./streams.js -a outputFile -f users.csv
// ./streams.js --help
// ./streams.js -h