import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../../presentation/errors'

const field = 'any_field'

interface ValidationSpy {
  error: Error
  input: any
  validate: (input: any) => Error
}

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeValidationSpy = (): ValidationSpy => {
  class ValidationSpy implements ValidationSpy {
    error: Error = null
    input: any

    validate (input: any): Error {
      this.input = input
      return this.error
    }
  }
  return new ValidationSpy()
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    makeValidationSpy(),
    makeValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: 'other_word' })
    expect(error).toEqual(validationSpies[1].error)
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: 'other_word' })
    expect(error).toEqual(validationSpies[0].error)
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: 'other_word' })
    expect(error).toBeFalsy()
  })
})
