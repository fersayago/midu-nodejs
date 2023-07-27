import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./ejemplo.txt', 'utf-8'),
  readFile('./ejemplo2.txt', 'utf-8')
]).then(([text, text2]) => {
  console.log('primer texto:', text)
  console.log('segundo texto:', text2)
});