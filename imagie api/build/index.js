'use strict'
const __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const index_1 = __importDefault(require('./routes/index'))
const logger_1 = __importDefault(require('./utilities/logger'))
const path_1 = __importDefault(require('path'))
const app = (0, express_1.default)()
const port = 3000
app.use('/api', logger_1.default, index_1.default)
app.get('/', logger_1.default, (req, res) => {
  res.sendFile(path_1.default.resolve('../') + '/landing-page/index.html')
})
app.use(express_1.default.static('landing-page'))
app.use((_req, res) => {
  res
    .status(404)
    .send(
      '<center><b><h2>Nothing to show here let me help you to get to the main page<br><a href="http://localhost:3000"> Main page</a>'
    )
})
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
exports.default = app
