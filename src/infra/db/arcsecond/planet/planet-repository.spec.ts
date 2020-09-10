import { PlanetRepository } from './planet-repository'
import ArcsecondHelper from '../helpers/arcsecond-helper'

beforeAll(() => {
  jest.spyOn(ArcsecondHelper.prototype, 'getRequest').mockImplementation(
    async () =>
      new Promise((resolve) =>
        resolve({
          results: [
            {
              name: 'any_name',
              mass: 123
            },
            {
              name: 'other_name',
              mass: 321
            }
          ]
        })
      )
  )
})

afterAll(() => {
  jest.restoreAllMocks()
})

const makeSut = (): PlanetRepository => {
  return new PlanetRepository()
}

describe('Planet Arcsecond Repository', () => {
  describe('loadAll()', () => {
    test('Should load all planets on success', async () => {
      const sut = makeSut()
      const planets = await sut.loadAll()
      expect(planets.length).toBe(2)
    })
  })
})
