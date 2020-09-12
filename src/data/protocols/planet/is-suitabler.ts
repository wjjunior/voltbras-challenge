import { PlanetModel } from '../../../domain/models/planet'

export interface IsSuitabler {
  isSuitable: (planet: PlanetModel) => boolean
}
