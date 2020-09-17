import { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'
import { SuitablePlanetValidator } from '../protocols/suitable-planet-validator'

// podemos usar isso em vez de uma classe
export const makeSuitablePlanetValidation =
  (fieldName: string, suitablePlanetValidator: SuitablePlanetValidator): Validation =>
    ({
      validate: async input => {
        const isValid = await suitablePlanetValidator.isValid(input[fieldName])
        if (!isValid) {
          return new InvalidParamError(fieldName)
        }
      }
    })
