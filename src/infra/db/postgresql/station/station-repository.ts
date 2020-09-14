import { AddStationModel } from '../../../../domain/usecases/add-station'
import { StationModel } from '../../../../domain/models/station'
import { AddStationRepository } from '../../../../data/protocols/db/station/add-station-repository'
import { PrismaHelper } from '../helpers/prismaHelper'
import { LoadStationsByPlanetRepository } from '../../../../data/protocols/db/station/load-stations-by-planet-repository'

export class StationRepository implements AddStationRepository, LoadStationsByPlanetRepository {
  async add (stationData: AddStationModel): Promise<StationModel> {
    return await PrismaHelper.client.station.create({
      data: { ...stationData }
    })
  }

  async loadByPlanetsNames (planets: string[]): Promise<StationModel[]> {
    const queryParams = planets.map((planetName: string) => {
      return {
        planet: {
          equals: planetName
        }
      }
    })
    return await PrismaHelper.client.station.findMany({ where: { OR: queryParams } })
  }
}
