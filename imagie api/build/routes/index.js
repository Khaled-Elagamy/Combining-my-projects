'use strict'
const __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const image_1 = __importDefault(require('./api/image'))
const reset_1 = __importDefault(require('./api/reset'))
const routes = express_1.default.Router()
routes.get('/', (req, res) => {
  res.send(
    '<center><b><h2>Nothing to show here let me help you to get to the main page<br><a href="http://localhost:3000"> Main page</a>'
  )
})
routes.use('/reset', reset_1.default)
routes.use('/image', image_1.default)
exports.default = routes
