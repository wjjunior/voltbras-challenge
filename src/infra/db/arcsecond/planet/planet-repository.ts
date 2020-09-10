import { LoadPlanetsRepository } from '@/data/protocols/db/planet/load-planets-repository'
import { PlanetModel } from '@/domain/models/planet'
import ArcsecondHelper from '../helpers/arcsecond-helper'

export class PlanetRepository implements LoadPlanetsRepository {
  private readonly arcsecondHelper: ArcsecondHelper
  constructor () {
    this.arcsecondHelper = new ArcsecondHelper()
  }

  async loadAll (): Promise<PlanetModel[]> {
    const planetsResponse = await this.arcsecondHelper.getRequest('exoplanets')
    return planetsResponse.results.map((data: PlanetModel) => {
      return {
        name: data.name,
        mass: data.mass
      }
    })
  }
}
