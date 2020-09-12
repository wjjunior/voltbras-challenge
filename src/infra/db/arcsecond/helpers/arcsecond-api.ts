import { RESTDataSource } from 'apollo-datasource-rest'

export default class ArcsecondApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://api.arcsecond.io/'
  }

  async getRequest (uri: string): Promise<any> {
    return await this.get(`${this.baseURL}${uri}`)
  }
}
