import { SuitablePlanetValidator } from '../../validation/protocols/suitable-planet-validator'
import fetch from 'node-fetch'
import { ArcsecondPlanet } from '../../infra/db/arcsecond/protocols/arsecondPlanet'

export class SuitablePlanetValidatorAdapter implements SuitablePlanetValidator {
  async isValid (planet: string): Promise<boolean> {
    const response = await fetch(`https://api.arcsecond.io/exoplanets/${planet}`)
    if (response.status === 404) {
      return false
    }
    const arcsecondPlanet = await response.json() as ArcsecondPlanet
    const suitableMass = 25
    if (arcsecondPlanet.mass.value < suitableMass) {
      return false
    }
    return true
  }
}
