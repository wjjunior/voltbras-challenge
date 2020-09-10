import { RESTDataSource } from 'apollo-datasource-rest'

export default class ArcsecondApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://api.arcsecond.io/'
  }

  async getRequest (uri: string): Promise<any> {
    const response = await this.get(`${this.baseURL}${uri}`)
    return JSON.parse(response)
  }
}
