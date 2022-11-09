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
const supertest_1 = __importDefault(require('supertest'))
const index_1 = __importDefault(require('../index'))
const request = (0, supertest_1.default)(index_1.default)
describe(' Test endpoint responses', () => {
  it('Gets the resize api endpoint', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const response = yield request.get(
        '/api/image/resize?name=fjord&width=700&height=300'
      )
      expect(response.status).toBe(200)
    }))
  it('Gets the reset api endpoint', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const response = yield request.get('/api/reset')
      expect(response.status).toBe(200)
    }))
  it('Get the delete endpoint', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const response = yield request.get('/api/reset/ok?response=ok')
      expect(response.status).toBe(200)
    }))
})
