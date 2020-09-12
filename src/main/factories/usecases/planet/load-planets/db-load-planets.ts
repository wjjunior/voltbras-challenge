import { LoadPlanets } from '../../../../../domain/usecases/load-planets'
import { PlanetRepository } from '../../../../../infra/db/arcsecond/planet/planet-repository'
import { DbLoadPlanets } from '../../../../../data/usecases/load-planets/db-load-planets'
import ArcsecondApi from '../../../../../infra/db/arcsecond/helpers/arcsecond-api'

export const makeDbLoadPlanets = (arcsecondApi: ArcsecondApi): LoadPlanets => {
  const planetRepository = new PlanetRepository(arcsecondApi)
  return new DbLoadPlanets(planetRepository)
}
