// talvez por uma qualidade estética um pouco maior
// daria de: https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353
import { LoadPlanetsController } from '../../../../../presentation/controllers/planet/load-planets/load-planets-controller'
import { makeDbLoadPlanets } from '../../../../../main/factories/usecases/planet/load-planets/db-load-planets'
import ArcsecondApi from '../../../../..//infra/db/arcsecond/helpers/arcsecond-api'
import { Controller } from '../../../../../presentation/protocols'
import { PlanetModel } from '../../../../../domain/models/planet';

export const makeLoadPlanetsController = (arcsecondApi: ArcsecondApi): Controller<{ pages: number }, PlanetModel[]> => {
  return new LoadPlanetsController(makeDbLoadPlanets(arcsecondApi))
}
