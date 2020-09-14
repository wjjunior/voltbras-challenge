import { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'
import { SuitablePlanetValidator } from '../protocols/suitable-planet-validator'

export class SuitablePlanetValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly suitablePlanetValidator: SuitablePlanetValidator
  ) {}

  async validate (input: any): Promise<Error> {
    const isValid = await this.suitablePlanetValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
