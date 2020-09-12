import { LoadPlanets } from '../../../domain/usecases/load-planets'
import { PlanetModel } from '../../../domain/models/planet'
import { LoadPlanetsRepository } from '../../../data/protocols/db/planet/load-planets-repository'
import { IsSuitabler } from '../../protocols/planet/is-suitabler'

export class DbLoadPlanets implements LoadPlanets {
  constructor (
    private readonly loadPlanetsRepository: LoadPlanetsRepository,
    private readonly isSuitabler: IsSuitabler
  ) {}

  async load (): Promise<PlanetModel[]> {
    const planets = await this.loadPlanetsRepository.loadAll()
    return planets.filter(this.isSuitabler.isSuitable)
  }
}
