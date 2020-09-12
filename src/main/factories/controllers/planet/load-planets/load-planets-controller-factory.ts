import { LoadPlanetsController } from '../../../../../presentation/controllers/planet/load-planets/load-planets-controller'
import { makeDbLoadPlanets } from '../../../../../main/factories/usecases/planet/load-planets/db-load-planets'
import ArcsecondApi from '../../../../..//infra/db/arcsecond/helpers/arcsecond-api'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadPlanetsController = (arcsecondApi: ArcsecondApi): Controller => {
  return new LoadPlanetsController(makeDbLoadPlanets(arcsecondApi))
}
