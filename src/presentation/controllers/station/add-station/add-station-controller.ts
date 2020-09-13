import { Controller, HttpRequest, HttpResponse, Validation } from './add-station-controller-protocols'
import { badRequest } from '../../../../presentation/helpers/http/http-helper'

export class AddStationController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return new Promise(resolve => resolve(null))
  }
}
