import { PlanetModel } from '../../../../domain/models/planet'

export interface LoadPlanetsRepository {
  loadAll: (pages: number) => Promise<PlanetModel[]>
}
