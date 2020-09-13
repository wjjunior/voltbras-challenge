import { DbAddStation } from './db-add-station'
import { AddStationModel, AddStationRepository, StationModel } from './db-add-station-protocols'

const makeFakeStationData = (): AddStationModel => ({
  name: 'any_name',
  planet: 'any_planet'
})
describe('DbAddPlanet', () => {
  test('Should call AddStationRepository with correct values', async () => {
    class AddStationRepositoryStub implements AddStationRepository {
      async add (data: AddStationModel): Promise<StationModel> {
        return new Promise(resolve => resolve({
          id: 1,
          name: 'any_name',
          planet: 'any_planet'
        }))
      }
    }
    const addStationRepositoryStub = new AddStationRepositoryStub()
    const addSpy = jest.spyOn(addStationRepositoryStub, 'add')
    const sut = new DbAddStation(addStationRepositoryStub)
    const stationData = makeFakeStationData()
    await sut.add(stationData)
    expect(addSpy).toHaveBeenCalledWith(stationData)
  })
})
