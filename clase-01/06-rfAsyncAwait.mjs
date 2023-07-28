import { readFile } from 'node:fs/promises'

console.log('Leyendo el primer archivo...')
const text = await readFile('./ejemplo.txt', 'utf-8')
console.log('primer texto:', text)

console.log('--> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
const text2 = await readFile('./ejemplo2.txt', 'utf-8')
console.log('segundo texto:', text2)