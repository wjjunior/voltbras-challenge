export interface SuitablePlanetValidator {
  isValid: (planet: string) => Promise<boolean>
}
