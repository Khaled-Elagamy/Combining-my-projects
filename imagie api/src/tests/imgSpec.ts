import { existsSync } from 'fs'
import path from 'path'
import sharp from 'sharp'

//Function to test the image processing
const transform = (place: string, w: number, h: number): void => {
  sharp(place)
    .resize({
      width: w,
      height: h
    })
    .toFile(path.resolve('./') + `/images/Thumbnail/fjord-${w}-${h}.jpg`)
}

describe('Test images', (): void => {
  it('Check if the image name exsis in the folder ', () => {
    expect(existsSync(path.resolve('./') + '/images/test.jpg')).toBeFalsy()
  })
  it('Images first time properties to be not exist ', async () => {
    expect(
      existsSync(path.resolve('./') + '/images/Thumbnail/fjord-700-200.jpg')
    ).toBeFalsy()
  })
  it('To check the image processing not giving errors ', async () => {
    expect(function() {
      transform(path.resolve('./') + '/images/fjord.jpg', 200, 300)
    }).not.toThrow()
  })
  it('Images second time properties to be exist ', async () => {
    expect(
      setTimeout(() => {
        existsSync(path.resolve('./') + '/images/Thumbnail/fjord-200-300.jpg')
      }, 1000)
    ).toBeTruthy()
  })
})
