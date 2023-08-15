const express = require('express') // require -> commonJS
const crypto = require('node:crypto')

const movies = require('./movies.json')
const validateMovie = require('./schemas/movies')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

// CORS
// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-FLIGHT
// OPTIONS

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234',
  'http://localhost:8080',
  'https://fersayago.github.io'
]

app.get('/movies', (req, res) => {
  // se puede especificar el origen reemplazando el asterisco por la url que puede acceder
  // res.header('Access-Control-Allow-Origin', '*')
  const origin = req.headers.origin
  // cuando la peticion es del mismo origin no se envia el header
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }

  res.json(movies)
})

// PARAMETROS EN URL
app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ error: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // 422 Unprocessable Entity
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  // En base de datozs
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data // != req.body - los datos estan validados
  }

  // Esto no seria REST por que estamos guardando el estado de la aplicacion en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // actualizar la cache del cliente
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.headers.origin
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params

  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.status(204)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params

  const result = validateMovie.validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie

  return res.json(updatedMovie)
})

// PARA QUE FUNCIONE EL METODO DELETE
app.options('/movies/:id', (req, res) => {
  const origin = req.headers.origin
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    // cabecera que indica cuales metodos puede usar
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }

  res.send()
})

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
