import { PlanetRepository } from './planet-repository'
import ArcsecondApi from '../helpers/arcsecond-api'

interface SutTypes {
  sut: PlanetRepository
  arcsecondApiStub: ArcsecondApi
}
const makeSut = (): SutTypes => {
  const arcsecondApiStub = new ArcsecondApi()
  const sut = new PlanetRepository(arcsecondApiStub)
  return {
    sut,
    arcsecondApiStub
  }
}

describe('Planet Arcsecond Repository', () => {
  describe('loadAll()', () => {
    test('Should load all planets on success', async () => {
      const { sut, arcsecondApiStub } = makeSut()
      jest.spyOn(arcsecondApiStub, 'getRequest').mockReturnValueOnce(new Promise((resolve) => resolve({
        results: [
          {
            name: 'any_name',
            mass: {
              unit: 'any_unit',
              value: 123
            }
          },
          {
            name: 'other_name',
            mass: {
              unit: 'any_unit',
              value: 321
            }
          }
        ]
      })))
      const planets = await sut.loadAll()
      expect(planets.length).toBe(2)
    })
  })
})
