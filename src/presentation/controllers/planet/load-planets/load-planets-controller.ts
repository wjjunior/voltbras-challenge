import { Controller, HttpRequest, HttpResponse, LoadPlanets } from './load-planets-controller-protocols'
import { ok } from '../../../helpers/http/http-helper'

export class LoadPlanetsController implements Controller {
  constructor (private readonly loadPlanets: LoadPlanets) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const planets = await this.loadPlanets.load()
    return ok(planets)
  }
}
