import { Controller, HttpRequest, HttpResponse, LoadPlanets } from './load-planets-controller-protocols'

export class LoadPlanetsController implements Controller {
  constructor (private readonly loadPlanets: LoadPlanets) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadPlanets.load()
    return null
  }
}
