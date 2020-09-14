import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { SuitablePlanetValidation } from '../../../../../validation/validators/suitable-planet-validation'
import { SuitablePlanetValidatorAdapter } from '../../../../../infra/validators/suitable-planet-validator-adapter'

export const makeAddStationValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'planet']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new SuitablePlanetValidation('planet', new SuitablePlanetValidatorAdapter()))
  return new ValidationComposite(validations)
}
