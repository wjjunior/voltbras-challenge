import { PrismaHelper } from '../helpers/prismaHelper'
import { StationRepository } from './station-repository'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  beforeEach(async () => {
    await PrismaHelper.client.station.deleteMany({})
  })

  const makeSut = (): StationRepository => {
    return new StationRepository()
  }

  describe('add()', () => {
    test('Should return a station on success', async () => {
      const sut = makeSut()
      const station = await sut.add({
        name: 'any_name',
        planet: 'any_planet'
      })
      expect(station).toBeTruthy()
      expect(station.id).toBeTruthy()
      expect(station.name).toBe('any_name')
      expect(station.planet).toBe('any_planet')
    })
  })

  describe('loadStationsByPlanet()', () => {
    test('Should return stations on success', async () => {
      const sut = makeSut()
      const addStationParams = {
        name: 'any_name',
        planet: 'any_planet'
      }
      await sut.add(addStationParams)
      const stations = await sut.loadByPlanetsNames([addStationParams.planet])
      expect(stations).toBeTruthy()
      expect(stations.length).toBe(1)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const stations = await sut.loadByPlanetsNames(['any_planet'])
      expect(stations).toEqual([])
    })
  })
})
