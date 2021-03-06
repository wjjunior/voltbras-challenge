import {
  HttpRequest,
  Validation,
  AddStation,
  AddStationModel
} from './add-station-controller-protocols'
import { AddStationController } from './add-station-controller'
import {
  badRequest,
  serverError
} from '../../../../presentation/helpers/http/http-helper'
import { StationModel } from '../../../../domain/models/station'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    planet: 'valid_planet'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddStation = (): AddStation => {
  class AddStationStub implements AddStation {
    async add (data: AddStationModel): Promise<StationModel> {
      const fakeStation = {
        id: 1,
        name: 'any_name',
        planet: 'valid_planet'
      }
      return await new Promise(resolve => resolve(fakeStation))
    }
  }
  return new AddStationStub()
}

interface SutTypes {
  sut: AddStationController
  validationStub: Validation
  addStationStub: AddStation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addStationStub = makeAddStation()
  const sut = new AddStationController(validationStub, addStationStub)
  return {
    sut,
    validationStub,
    addStationStub
  }
}

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddStation with correct values', async () => {
    const { sut, addStationStub } = makeSut()
    const addSpy = jest.spyOn(addStationStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddStation throws', async () => {
    const { sut, addStationStub } = makeSut()
    jest
      .spyOn(addStationStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 1,
      name: 'any_name',
      planet: 'valid_planet'
    })
  })
})
