import { makeAddStationValidation } from './add-station-validator-factory'
import { makeDbAddStation } from '../../../../../main/factories/usecases/station/add-station/db-add-station'
import { AddStationController } from '../../../../../presentation/controllers/station/add-station/add-station-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddStationController = (): Controller => {
  return new AddStationController(makeAddStationValidation(), makeDbAddStation())
}
