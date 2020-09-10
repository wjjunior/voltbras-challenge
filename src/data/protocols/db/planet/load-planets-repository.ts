import { PlanetModel } from '../../../../domain/models/planet'

export interface LoadPlanetsRepository {
  loadAll: () => Promise<PlanetModel[]>
}
