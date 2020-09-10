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

interface SutTypes {
  sut: DbLoadPlanets
  loadPlanetsRepositoryStub: LoadPlanetsRepository
}

const makeLoadPlanetsRepository = (): LoadPlanetsRepository => {
  class LoadPlanetsRepositoryStub implements LoadPlanetsRepository {
    async loadAll (): Promise<PlanetModel[]> {
      return new Promise(resolve => resolve(makeFakePlanets()))
    }
  }
  return new LoadPlanetsRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadPlanetsRepositoryStub = makeLoadPlanetsRepository()
  const sut = new DbLoadPlanets(loadPlanetsRepositoryStub)
  return {
    sut,
    loadPlanetsRepositoryStub
  }
}

describe('DbLoadPlanets', () => {
  test('Should call LoadPlanetsRepository', async () => {
    const { sut, loadPlanetsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadPlanetsRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
