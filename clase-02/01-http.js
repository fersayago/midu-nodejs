const http = require('node:http')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  if (req.url === '/') {
    // por defecto es 200
    // res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Página de inicio</h1>')
  } else if (req.url === '/contacto') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Página de contacto</h1>')
  } else {
    res.statusCode = 404 // not found
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
