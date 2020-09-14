import { StationModel } from '../../../../domain/models/station'

export interface LoadStationsByPlanetRepository {
  loadByPlanetsNames: (planet: string[]) => Promise<StationModel[]>
}
