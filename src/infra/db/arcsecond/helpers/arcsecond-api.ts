import { RESTDataSource } from 'apollo-datasource-rest'
import { ArcsecondApiRepository } from '../protocols/arcesond-api'

export default class ArcsecondApi extends RESTDataSource implements ArcsecondApiRepository {
  baseURL = 'https://api.arcsecond.io/'

  async getRequest(uri: string): Promise<any> {
    return await this.get(`${this.baseURL}${uri}`)
  }
}
