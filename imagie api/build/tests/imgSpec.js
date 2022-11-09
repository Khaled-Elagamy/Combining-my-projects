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
const fs_1 = require('fs')
const path_1 = __importDefault(require('path'))
const sharp_1 = __importDefault(require('sharp'))
//Function to test the image processing
const transform = (place, w, h) => {
  ;(0, sharp_1.default)(place)
    .resize({
      width: w,
      height: h
    })
    .toFile(
      path_1.default.resolve('./') + `/images/Thumbnail/fjord-${w}-${h}.jpg`
    )
}
describe('Test images', () => {
  it('Check if the image name exsis in the folder ', () => {
    expect(
      (0, fs_1.existsSync)(path_1.default.resolve('./') + '/images/test.jpg')
    ).toBeFalsy()
  })
  it('Images first time properties to be not exist ', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      expect(
        (0, fs_1.existsSync)(
          path_1.default.resolve('./') + '/images/Thumbnail/fjord-700-200.jpg'
        )
      ).toBeFalsy()
    }))
  it('To check the image processing not giving errors ', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      expect(function() {
        transform(path_1.default.resolve('./') + '/images/fjord.jpg', 200, 300)
      }).not.toThrow()
    }))
  it('Images second time properties to be exist ', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      expect(
        setTimeout(() => {
          ;(0, fs_1.existsSync)(
            path_1.default.resolve('./') + '/images/Thumbnail/fjord-200-300.jpg'
          )
        }, 1000)
      ).toBeTruthy()
    }))
})
