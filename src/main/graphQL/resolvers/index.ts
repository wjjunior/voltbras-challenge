import { makeLoadPlanetsController } from '../../../main/factories/controllers/planet/load-planets/load-planets-controller-factory'
import { makeAddStationController } from '../../../main/factories/controllers/station/add-station/add-station-controller-factory'
import { PlanetModel } from '../../../domain/models/planet'
import { adaptGraphql } from '../../../main/adapters/graphql-adapter'

export const resolvers = {
  Query: {
    suitablePlanets: async (_, args: any, { dataSources }): Promise<PlanetModel[]> => {
      return adaptGraphql(makeLoadPlanetsController(dataSources.arcsecondApi), args)
    }
  },

  Mutation: {
    installStation: (_, args: any): any => {
      return adaptGraphql(makeAddStationController(), { ...args.input })
    }
  }
}
