import { LoadPlanets } from '../../../domain/usecases/load-planets'
import { PlanetModel } from '../../../domain/models/planet'
import { LoadPlanetsRepository } from '../../../data/protocols/db/planet/load-planets-repository'

export class DbLoadPlanets implements LoadPlanets {
  constructor (private readonly loadPlanetsRepository: LoadPlanetsRepository) {}
  async load (): Promise<PlanetModel[]> {
    const planets = await this.loadPlanetsRepository.loadAll()
    return planets
  }
}
