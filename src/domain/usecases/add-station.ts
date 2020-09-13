import { StationModel } from '../models/station'

export interface AddStationModel {
  planet: string
}

export interface AddStation {
  add: (data: AddStationModel) => Promise<StationModel>
}
