import { makeSuitablePlanetValidation } from './suitable-planet-validation'
import { InvalidParamError } from '../../presentation/errors'
import { SuitablePlanetValidator } from '../protocols/suitable-planet-validator'
import { Validation } from '../../presentation/protocols/validation';

const field = 'any_word'

const makeSuitableValidator = (): SuitablePlanetValidator => {
  class SuitablePlanetValidatorStub implements SuitablePlanetValidator {
    async isValid(planet: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true))
    }
  }
  return new SuitablePlanetValidatorStub()
}

type SutTypes = {
  sut: Validation
  suitablePlanetValidatorStub: SuitablePlanetValidator
}

const makeSut = (): SutTypes => {
  const suitablePlanetValidatorStub = makeSuitableValidator()
  const sut = makeSuitablePlanetValidation(field, suitablePlanetValidatorStub)
  return {
    sut,
    suitablePlanetValidatorStub
  }
}

describe('Suitable Planet Validation', () => {
  test('Should return an error if SuitablePlanetValidator returns false', async () => {
    const { sut, suitablePlanetValidatorStub } = makeSut()
    jest
      .spyOn(suitablePlanetValidatorStub, 'isValid')
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(false))
      )
    const error = await sut.validate({ [field]: 'any_planet' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call SuitablePlanetValidator with correct planet', async () => {
    const { sut } = makeSut()
    const validate = await sut.validate({ [field]: 'any_planet' })
    expect(() => validate).not.toThrow(new InvalidParamError(field))
  })
})
