import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe(' Test endpoint responses', (): void => {
  it('Gets the resize api endpoint', async () => {
    const response = await request.get(
      '/api/image/resize?name=fjord&width=700&height=300'
    )
    expect(response.status).toBe(200)
  })
  it('Gets the reset api endpoint', async () => {
    const response = await request.get('/api/reset')
    expect(response.status).toBe(200)
  })
  it('Get the delete endpoint', async () => {
    const response = await request.get('/api/reset/ok?response=ok')
    expect(response.status).toBe(200)
  })
})
