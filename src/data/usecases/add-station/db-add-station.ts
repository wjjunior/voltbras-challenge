import { AddStation, AddStationModel, StationModel, AddStationRepository } from './db-add-station-protocols'

export class DbAddStation implements AddStation {
  constructor (private readonly addStationRepository: AddStationRepository) {}
  async add (data: AddStationModel): Promise<StationModel> {
    return await this.addStationRepository.add(data)
  }
}
