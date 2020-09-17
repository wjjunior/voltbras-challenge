import { LoadPlanets } from '../../../../../domain/usecases/load-planets'
import { PlanetRepository } from '../../../../../infra/db/arcsecond/planet/planet-repository'
import { DbLoadPlanets } from '../../../../../data/usecases/load-planets/db-load-planets'
import ArcsecondApi from '../../../../../infra/db/arcsecond/helpers/arcsecond-api'
import { planetAdapter } from '../../../../../infra/planet/planet-adapter'
import { StationRepository } from '../../../../../infra/db/postgresql/station/station-repository'

export const makeDbLoadPlanets = (arcsecondApi: ArcsecondApi): LoadPlanets => {
  const planetRepository = new PlanetRepository(arcsecondApi)
  const stationRepository = new StationRepository()
  return new DbLoadPlanets(planetRepository, planetAdapter, stationRepository)
}
