import { LoadPlanetsController } from './load-planets-controller'
import { PlanetModel, LoadPlanets } from './load-planets-controller-protocols'

const makeFakePlanets = (): PlanetModel[] => {
  return [{
    id: 1,
    name: 'any_name',
    mass: 27.5,
    hasStation: true
  }]
}

interface SutTypes {
  sut: LoadPlanetsController
  loadPlanetsStub: LoadPlanets
}

const makeLoadPlanets = (): LoadPlanets => {
  class LoadPlanetsStub implements LoadPlanets {
    async load (): Promise<PlanetModel[]> {
      return new Promise(resolve => resolve(makeFakePlanets()))
    }
  }
  return new LoadPlanetsStub()
}

const makeSut = (): SutTypes => {
  const loadPlanetsStub = makeLoadPlanets()
  const sut = new LoadPlanetsController(loadPlanetsStub)
  return {
    sut,
    loadPlanetsStub
  }
}

describe('LoadPlanets Controller', () => {
  test('Should call LoadPlanets', async () => {
    const { sut, loadPlanetsStub } = makeSut()
    const loadSpy = jest.spyOn(loadPlanetsStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
