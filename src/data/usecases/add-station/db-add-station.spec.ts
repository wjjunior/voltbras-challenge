import { DbAddStation } from './db-add-station'
import {
  AddStationModel,
  AddStationRepository,
  StationModel
} from './db-add-station-protocols'

const makeFakeStationData = (): AddStationModel => ({
  name: 'any_name',
  planet: 'any_planet'
})

const makeAddStationRepository = (): AddStationRepository => {
  class AddStationRepositoryStub implements AddStationRepository {
    async add (data: AddStationModel): Promise<StationModel> {
      return new Promise((resolve) =>
        resolve({
          id: 1,
          name: 'any_name',
          planet: 'any_planet'
        })
      )
    }
  }
  return new AddStationRepositoryStub()
}

interface SutTypes {
  sut: DbAddStation
  addStationRepositoryStub: AddStationRepository
}

const makeSut = (): SutTypes => {
  const addStationRepositoryStub = makeAddStationRepository()
  const sut = new DbAddStation(addStationRepositoryStub)
  return {
    sut,
    addStationRepositoryStub
  }
}

describe('DbAddPlanet', () => {
  test('Should call AddStationRepository with correct values', async () => {
    const { sut, addStationRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addStationRepositoryStub, 'add')
    const stationData = makeFakeStationData()
    await sut.add(stationData)
    expect(addSpy).toHaveBeenCalledWith(stationData)
  })

  test('Should throws if AddStationRepository throws', async () => {
    const { sut, addStationRepositoryStub } = makeSut()
    jest
      .spyOn(addStationRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.add(makeFakeStationData())
    await expect(promise).rejects.toThrow()
  })
})
