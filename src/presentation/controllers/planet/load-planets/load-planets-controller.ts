import { Controller, HttpRequest, HttpResponse, LoadPlanets } from './load-planets-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { PlanetModel } from '../../../../domain/models/planet';

export class LoadPlanetsController implements Controller {
  constructor(private readonly loadPlanets: LoadPlanets) { }

  // gostei do tratamento de exception
  // ter um jeito mais funcional de handlear a resposta da função fica bem mais limpo pra quem chama
  async handle(httpRequest: HttpRequest<{ pages: number }>): Promise<HttpResponse<PlanetModel[]>> {
    try {
      const { pages } = httpRequest.body
      const planets = await this.loadPlanets.load(pages)
      return ok(planets)
    } catch (error) {
      return serverError(error)
    }
  }
}
