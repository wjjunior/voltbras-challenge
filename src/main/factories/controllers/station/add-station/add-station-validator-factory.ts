import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeSuitablePlanetValidation } from '../../../../../validation/validators/suitable-planet-validation'
import { SuitablePlanetValidatorAdapter } from '../../../../../infra/validators/suitable-planet-validator-adapter'

const requiredFields = ['name', 'planet'];
export const makeAddStationValidation = (): ValidationComposite => {
  const validations: Validation[] = requiredFields.map(f => new RequiredFieldValidation(f));
  validations.push(makeSuitablePlanetValidation('planet', new SuitablePlanetValidatorAdapter()))
  return new ValidationComposite(validations)
}
