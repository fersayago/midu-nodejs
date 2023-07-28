const fs = require('node:fs/promises')

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

console.log('Leyendo el primer archivo...')
fs.readFile('./ejemplo.txt', 'utf-8')
  .then(text => {
    console.log('primer texto:', text)
  })

console.log('--> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./ejemplo2.txt', 'utf-8')
  .then(text => {
    console.log('segundo texto:', text)
  })