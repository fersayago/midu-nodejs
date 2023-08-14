const express = require('express')
const pikachuJSON = require('./pokemon/pikachu.json')

const PORT = process.env.PORT ?? 1234

const app = express()
// deshabilitar la cabecera que dice con que esta hecho el servidor
app.disable('x-powered-by') // X-Powered-By: Express

app.use(express.json())

// Middleware
// se puede discriminar por accion, url, etc
// app.use((req, res, next) => {
//   // es importante recordar que si no se llama a next, la request no avanza
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // solo llegan request que son POST y que tienen el header content-type: application/json

//   let body = ''

//   // Escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     console.log(data)
//     data.timestamp = Date.now()
//     // mutar la request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mi Pagina</h1>')
})

app.get('/pokemon/pikachu', (req, res) => {
  res.status(200).json(pikachuJSON)
})

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en bbdd
  res.status(201).json(req.body)
})

// el .use se utiliza para todas las acciones
app.use((req, res) => {
  res.status(404).send('<h1>404: Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
