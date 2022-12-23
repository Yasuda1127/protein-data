server.js
// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const allowlist = [
    'https://protein-flame.vercel.app',
    'https://protein-65avm5fws-ronaudo9.vercel.app',
    'https://protein-nu.vercel.app',
    'https://protein-blue.vercel.app',
]

const corsOptions = {
  origin: function (origin, callback) {
    if (allowlist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

server.use(cors(corsOptions))

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
