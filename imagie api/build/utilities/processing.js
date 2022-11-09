'use strict'
const __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
const __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const sharp_1 = __importDefault(require('sharp'))
const path_1 = __importDefault(require('path'))
const processing = (req, res) => {
  const name = req.query.name,
    wide = Number(req.query.width),
    tall = Number(req.query.height)
  //Paths
  const imgName = path_1.default.resolve('./') + `/images/${name}.jpg`
  const imgEdited =
    path_1.default.resolve('./') +
    `/images/Thumbnail/${name}-${wide}-${tall}.jpg`
  ;(function() {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        yield (0, sharp_1.default)(imgName)
          .resize({
            width: Number(wide),
            height: Number(tall),
            fit: 'cover'
          })
          .toFile(imgEdited)
        return res.sendFile(imgEdited)
      } catch (error) {
        console.log(error)
      }
    })
  })()
}
exports.default = processing
