import { LoadPlanetsRepository } from '../../../../data/protocols/db/planet/load-planets-repository'
import { PlanetModel } from '../../../../domain/models/planet'
import ArcsecondApi from '../helpers/arcsecond-api'
import { ArcsecondPlanet } from '../protocols/arsecondPlanet'

export class PlanetRepository implements LoadPlanetsRepository {
  constructor (private readonly arcsecondApi: ArcsecondApi) {}

  async loadAll (): Promise<PlanetModel[]> {
    const planetsResponse = await this.arcsecondApi.getRequest('exoplanets')
    return planetsResponse.results.map((data: ArcsecondPlanet) => {
      return {
        name: data.name,
        mass: data.mass?.value
      }
    })
  }
}
