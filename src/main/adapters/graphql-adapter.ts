import { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptGraphql = async (controller: Controller, args: any): Promise<any> => {
  const httpRequest: HttpRequest = {
    body: args
  }
  const httpResponse = await controller.handle(httpRequest)
  return httpResponse.body
}
