import { AddStationModel } from '../../../../domain/usecases/add-station'
import { StationModel } from '../../../../domain/models/station'

export interface AddStationRepository {
  add: (stationData: AddStationModel) => Promise<StationModel>
}
