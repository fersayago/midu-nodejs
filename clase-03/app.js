const express = require('express') // require -> commonJS
const crypto = require('node:crypto')
const movies = require('./movies.json')
const validateMovie = require('./schemas/movies')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
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
    ...result.data // != req.body ya que estan los datos validados
  }

  // Esto no seria REST por que estamos guardando el estado de la aplicacion en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // actualizar la cache del cliente
})

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
