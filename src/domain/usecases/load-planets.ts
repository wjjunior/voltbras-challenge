import { PlanetModel } from '../models/planet'

export interface LoadPlanets {
  load: (page: number) => Promise<PlanetModel[]>
}
