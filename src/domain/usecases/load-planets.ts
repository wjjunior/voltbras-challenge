import { PlanetModel } from '../models/planet'

export interface LoadPlanets {
  load: () => Promise<PlanetModel[]>
}
