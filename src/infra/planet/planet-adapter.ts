import { IsSuitabler } from '../../data/protocols/planet/is-suitabler'
import { PlanetModel } from '../../domain/models/planet'

export class PlanetAdapter implements IsSuitabler {
  isSuitable (planet: PlanetModel): boolean {
    const suitableMass = 25
    return planet.mass > suitableMass
  }
}
