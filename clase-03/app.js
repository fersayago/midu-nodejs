const express = require('express') // require -> commonJS
const movies = require('./movies.json')

const app = express()
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

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
