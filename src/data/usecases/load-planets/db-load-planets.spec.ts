import { LoadPlanetsRepository } from '@/data/protocols/db/planet/load-planets-repository'
import { PlanetModel } from '@/domain/models/planet'
import { DbLoadPlanets } from './db-load-planets'

const makeFakePlanets = (): PlanetModel[] => {
  return [{
    id: 1,
    name: 'any_name',
    mass: 27.5,
    hasStation: true
  }, {
    id: 2,
    name: 'other_name',
    mass: 22.2,
    hasStation: false
  }]
}

describe('DbLoadPlanets', () => {
  test('Should call LoadPlanetsRepository', async () => {
    class LoadPlanetsRepositoryStub implements LoadPlanetsRepository {
      async loadAll (): Promise<PlanetModel[]> {
        return new Promise(resolve => resolve(makeFakePlanets()))
      }
    }
    const loadPlanetsRepositoryStub = new LoadPlanetsRepositoryStub()
    const loadAllSpy = jest.spyOn(loadPlanetsRepositoryStub, 'loadAll')
    const sut = new DbLoadPlanets(loadPlanetsRepositoryStub)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
