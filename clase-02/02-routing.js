const http = require('node:http')

const pikachuJSON = require('./pokemon/pikachu.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/pikachu':
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(JSON.stringify(pikachuJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(`<h1>404 ${method} for ${url} not found</h1>`)
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // Escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })

          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(`<h1>404: ${method} for ${url} not found</h1>`)
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server listening on port http://localhost:1234')
})
