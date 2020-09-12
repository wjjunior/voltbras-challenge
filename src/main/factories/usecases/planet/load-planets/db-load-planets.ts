import { LoadPlanets } from '../../../../../domain/usecases/load-planets'
import { PlanetRepository } from '../../../../../infra/db/arcsecond/planet/planet-repository'
import { DbLoadPlanets } from '../../../../../data/usecases/load-planets/db-load-planets'
import ArcsecondApi from '../../../../../infra/db/arcsecond/helpers/arcsecond-api'
import { PlanetAdapter } from '../../../../../infra/planet/planet-adapter'

export const makeDbLoadPlanets = (arcsecondApi: ArcsecondApi): LoadPlanets => {
  const planetRepository = new PlanetRepository(arcsecondApi)
  const planetAdapter = new PlanetAdapter()
  return new DbLoadPlanets(planetRepository, planetAdapter)
}
