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

describe('LoadPlanets Controller', () => {
  test('Should call LoadPlanets', async () => {
    class LoadPlanetsStub implements LoadPlanets {
      async load (): Promise<PlanetModel[]> {
        return new Promise(resolve => resolve(makeFakePlanets()))
      }
    }
    const loadPlanetsStub = new LoadPlanetsStub()
    const loadSpy = jest.spyOn(loadPlanetsStub, 'load')
    const sut = new LoadPlanetsController(loadPlanetsStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
