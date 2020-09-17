import { makeLoadPlanetsController } from '../../../main/factories/controllers/planet/load-planets/load-planets-controller-factory'
import { makeAddStationController } from '../../../main/factories/controllers/station/add-station/add-station-controller-factory'
import { PlanetModel } from '../../../domain/models/planet'
import { adaptGraphql } from '../../../main/adapters/graphql-adapter'
import { StationModel } from '../../../domain/models/station'

export const resolvers = {
  Query: {
    // perdemos toda a tipagem dos args
    suitablePlanets: (_, args: { pages: number }, { dataSources }): Promise<PlanetModel[]> =>
      adaptGraphql(makeLoadPlanetsController(dataSources.arcsecondApi), args)
  },

  Mutation: {
    installStation: (_, args: { input: { name: string, planet: string } }): Promise<StationModel> =>
      adaptGraphql(makeAddStationController(), { ...args.input })
  }
}
