import { StationModel } from '../models/station'

export interface AddStationModel {
  name: string
  planet: string
}

export interface AddStation {
  add: (data: AddStationModel) => Promise<StationModel>
}
