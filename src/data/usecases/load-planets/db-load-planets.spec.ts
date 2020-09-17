import { LoadPlanetsRepository } from '../../../data/protocols/db/planet/load-planets-repository'
import { PlanetModel } from '../../../domain/models/planet'
import { DbLoadPlanets } from './db-load-planets'
import { planetAdapter } from '../../../infra/planet/planet-adapter'
import { LoadStationsByPlanetRepository } from '../../../data/protocols/db/station/load-stations-by-planet-repository'
import { StationModel } from '../add-station/db-add-station-protocols'

const makeFakePlanets = (): PlanetModel[] => {
  return [
    {
      name: 'any_planet_name',
      mass: 27.5
    },
    {
      name: 'other_planet_name',
      mass: 22.2
    },
    {
      name: 'some_planet_name',
      mass: 40.2
    },
    {
      name: 'another_planet_name',
      mass: 30.2
    }
  ]
}

const makeFakeStations = (): StationModel[] => {
  return [
    {
      id: 1,
      name: 'any_station_name',
      planet: 'any_planet_name'
    },
    {
      id: 2,
      name: 'another_station_name',
      planet: 'another_planet_name'
    }
  ]
}

interface SutTypes {
  sut: DbLoadPlanets
  loadPlanetsRepositoryStub: LoadPlanetsRepository
  loadStationsByPlanetRepositoryStub: LoadStationsByPlanetRepository
}

const makeLoadPlanetsRepository = (): LoadPlanetsRepository => {
  class LoadPlanetsRepositoryStub implements LoadPlanetsRepository {
    async loadAll(pages: number): Promise<PlanetModel[]> {
      return new Promise((resolve) => resolve(makeFakePlanets()))
    }
  }
  return new LoadPlanetsRepositoryStub()
}

const makeLoadStationsByPlanetRepository = (): LoadStationsByPlanetRepository => {
  class LoadStationsByPlanetRepositoryStub implements LoadStationsByPlanetRepository {
    async loadByPlanetsNames(planet: string[]): Promise<StationModel[]> {
      return new Promise((resolve) => resolve(makeFakeStations()))
    }
  }
  return new LoadStationsByPlanetRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadPlanetsRepositoryStub = makeLoadPlanetsRepository()
  const loadStationsByPlanetRepositoryStub = makeLoadStationsByPlanetRepository()
  const sut = new DbLoadPlanets(loadPlanetsRepositoryStub, planetAdapter, loadStationsByPlanetRepositoryStub)
  return {
    sut,
    loadPlanetsRepositoryStub,
    loadStationsByPlanetRepositoryStub
  }
}

describe('DbLoadPlanets', () => {
  test('Should call LoadPlanetsRepository', async () => {
    const { sut, loadPlanetsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadPlanetsRepositoryStub, 'loadAll')
    await sut.load(1)
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Planets on success', async () => {
    const { sut } = makeSut()
    const planets = await sut.load(1)
    expect(planets.length).toBe(3)
    expect(planets[0].hasStation).toBeTruthy()
    expect(planets[1].hasStation).toBeFalsy()
  })

  test('Should throws if LoadPlanetsRepository throws', async () => {
    const { sut, loadPlanetsRepositoryStub } = makeSut()
    jest
      .spyOn(loadPlanetsRepositoryStub, 'loadAll')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.load(1)
    await expect(promise).rejects.toThrow()
  })
})
