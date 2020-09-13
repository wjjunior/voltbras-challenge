import { Controller, HttpRequest, HttpResponse, Validation } from './add-station-controller-protocols'
import { badRequest, serverError, ok } from '../../../../presentation/helpers/http/http-helper'
import { AddStation } from '../../../../domain/usecases/add-station'

export class AddStationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addStation: AddStation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { planet, name } = httpRequest.body
      const station = await this.addStation.add({
        name,
        planet
      })
      return ok(station)
    } catch (error) {
      return serverError(error)
    }
  }
}
