import { LoadPlanets } from '../../../domain/usecases/load-planets'
import { PlanetModel } from '../../../domain/models/planet'
import { LoadPlanetsRepository } from '../../../data/protocols/db/planet/load-planets-repository'
import { IsSuitable } from '../../protocols/planet/is-suitabler'
import { LoadStationsByPlanetRepository } from '../../../data/protocols/db/station/load-stations-by-planet-repository'
import * as R from 'ramda'

export class DbLoadPlanets implements LoadPlanets {
  constructor(
    private readonly loadPlanetsRepository: LoadPlanetsRepository,
    private readonly isSuitable: IsSuitable,
    private readonly loadStationsByPlanet: LoadStationsByPlanetRepository
  ) { }

  async load(pages: number): Promise<PlanetModel[]> {
    const planets = await this.loadPlanetsRepository.loadAll(pages)
    const suitablePlanets = planets.filter(this.isSuitable)
    const getNames = R.pluck('name')
    const stations = await this.loadStationsByPlanet.loadByPlanetsNames(getNames(suitablePlanets))
    return suitablePlanets.map((planet: PlanetModel) => ({
      ...planet,
      hasStation: stations.filter(R.propEq('planet', planet.name)).length > 0
    }))
  }
}
