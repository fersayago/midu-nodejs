import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'samsung',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        // se usa el signo de pregunta para evitar inyección de código
        // por lo que transforma lowerCaseGenre en un string seguro
        'SELECT id, name FROM genres WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      // no genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // TODO: Traer peliculas por genero cond el @id
      return [id]
    }

    // devuelve una tupla con el resultado y la información de la tabla
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies;'
    )
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);',
      [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    // TODO: Crear la conexión de genre

    // crypto.randomUUID() genera un id único
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      // podemos hacer inyección de codigo ya que nosotros definimos el uuid
      await connection.query(
        `INSERT INTO movies (title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // puede enviar información sensible
      throw new Error('Erro creating movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    // traer la pelicula creada
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    // TODO: Crear delete
  }

  static async update ({ id, input }) {
    // TODO: Crear update
  }
}
