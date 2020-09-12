import { LoadPlanetsRepository } from '../../../../data/protocols/db/planet/load-planets-repository'
import { PlanetModel } from '../../../../domain/models/planet'
import ArcsecondApi from '../helpers/arcsecond-api'
import {
  ArcsecondPlanet,
  ArcsecondPlanetReponse
} from '../protocols/arsecondPlanet'
import * as R from 'ramda'
import { asyncPool } from '../helpers/async-pool'

export class PlanetRepository implements LoadPlanetsRepository {
  constructor (private readonly arcsecondApi: ArcsecondApi) {}

  async loadAll (pages: number): Promise<PlanetModel[]> {
    const queryPages = R.range(1, ++pages)
    const iteratorFn = async (page: number): Promise<PlanetModel[]> => {
      return await this.arcsecondApi.getRequest(`exoplanets?page=${page}`)
    }

    const planetsResponse = await asyncPool(2, queryPages, iteratorFn)

    return planetsResponse
      .flatMap((planet: ArcsecondPlanetReponse) => planet.results)
      .map((data: ArcsecondPlanet) => {
        return {
          name: data.name,
          mass: data.mass?.value
        }
      })
  }
}
