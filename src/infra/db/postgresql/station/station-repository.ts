import { AddStationModel } from '../../../../domain/usecases/add-station'
import { StationModel } from '../../../../domain/models/station'
import { AddStationRepository } from '../../../../data/protocols/db/station/add-station-repository'
import { PrismaHelper } from '../helpers/prismaHelper'

export class StationRepository implements AddStationRepository {
  async add (stationData: AddStationModel): Promise<StationModel> {
    const prismaClient = PrismaHelper.getTable()
    return await prismaClient.station.create({
      data: { ...stationData }
    })
  }
}
