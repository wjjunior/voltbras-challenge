import { Controller, HttpRequest, HttpResponse, LoadPlanets } from './load-planets-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class LoadPlanetsController implements Controller {
  constructor (private readonly loadPlanets: LoadPlanets) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { pages } = httpRequest.body
      const planets = await this.loadPlanets.load(pages)
      return ok(planets)
    } catch (error) {
      return serverError(error)
    }
  }
}
