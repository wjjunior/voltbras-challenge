import { PrismaHelper } from '../helpers/prismaHelper'
import { StationRepository } from './station-repository'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  const makeSut = (): StationRepository => {
    return new StationRepository()
  }

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
