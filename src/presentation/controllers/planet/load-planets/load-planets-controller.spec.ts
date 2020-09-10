import { LoadPlanetsController } from './load-planets-controller'
import { PlanetModel, LoadPlanets } from './load-planets-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

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

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakePlanets()))
  })

  test('Should return 500 if loadPlanets throws', async () => {
    const { sut, loadPlanetsStub } = makeSut()
    jest.spyOn(loadPlanetsStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
