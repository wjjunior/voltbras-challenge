import { LoadPlanetsController } from './load-planets-controller'
import { PlanetModel, LoadPlanets, HttpRequest } from './load-planets-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      pages: 1
    }
  }
}

const makeFakePlanets = (): PlanetModel[] => {
  return [{
    name: 'any_name',
    mass: 27.5
  }, {
    name: 'other_name',
    mass: 22.2
  }]
}

interface SutTypes {
  sut: LoadPlanetsController
  loadPlanetsStub: LoadPlanets
}

const makeLoadPlanets = (): LoadPlanets => {
  class LoadPlanetsStub implements LoadPlanets {
    async load (pages: number): Promise<PlanetModel[]> {
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
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(makeFakePlanets()))
  })

  test('Should return 500 if loadPlanets throws', async () => {
    const { sut, loadPlanetsStub } = makeSut()
    jest.spyOn(loadPlanetsStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
