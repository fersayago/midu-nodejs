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
    // devuelve una tupla con el resultado y la información de la tabla
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies;'
    )
    return movies
  }

  static async getById ({ id }) {

  }

  static async create (input) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
