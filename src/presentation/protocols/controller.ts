import { HttpResponse, HttpRequest } from './http'

// dá de ser um pouco mais criterioso e tirar o = any
// pra obrigar o client a dar uma informação do type
export interface Controller<ReqBody = any, RespBody = any> {
  handle: (httpRequest: HttpRequest<ReqBody>) => Promise<HttpResponse<RespBody>>
}
