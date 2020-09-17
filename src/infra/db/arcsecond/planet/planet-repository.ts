import { LoadPlanetsRepository } from '../../../../data/protocols/db/planet/load-planets-repository'
import { PlanetModel } from '../../../../domain/models/planet'
import ArcsecondApi from '../helpers/arcsecond-api'
import { ArcsecondPlanetReponse } from '../protocols/arsecondPlanet'
import * as R from 'ramda'
import { asyncPool } from '../helpers/async-pool'

export class PlanetRepository implements LoadPlanetsRepository {
  constructor(
    private readonly arcsecondApi: ArcsecondApi
  ) { }

  async loadAll(pages: number): Promise<PlanetModel[]> {
    const queryPages = R.range(1, ++pages)
    // tava errada a tipagem aqui, ele retorna a página, não os planetas
    const iteratorFn = async (page: number): Promise<ArcsecondPlanetReponse> => {
      return await this.arcsecondApi.getRequest(`exoplanets?page=${page}`)
    }

    // gostei da concorrencia na hora de pegar as responses
    const planetsResponse = await asyncPool(2, queryPages, iteratorFn)

    return planetsResponse
      .flatMap(response => response.results)
      .map(data => ({
        name: data.name,
        mass: data.mass?.value
      }))
  }
}
