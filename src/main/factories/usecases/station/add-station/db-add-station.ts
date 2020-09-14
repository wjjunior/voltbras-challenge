import { AddStation } from '../../../../../domain/usecases/add-station'
import { StationRepository } from '../../../../../infra/db/postgresql/station/station-repository'
import { DbAddStation } from '../../../../../data/usecases/add-station/db-add-station'

export const makeDbAddStation = (): AddStation => {
  const stationRepository = new StationRepository()
  return new DbAddStation(stationRepository)
}
