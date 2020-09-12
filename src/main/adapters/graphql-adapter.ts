import { Controller, HttpRequest } from '../../presentation/protocols'
import { PlanetModel } from '../../domain/models/planet'

export const adaptGraphql = async (controller: Controller, args: any): Promise<PlanetModel[]> => {
  const httpRequest: HttpRequest = {
    body: args
  }
  const httpResponse = await controller.handle(httpRequest)
  return httpResponse.body
}
