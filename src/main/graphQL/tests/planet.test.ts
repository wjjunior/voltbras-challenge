import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import ArcsecondApi from '../../../infra/db/arcsecond/helpers/arcsecond-api'
import { typeDefs, resolvers } from '../'
import { ApolloServer } from 'apollo-server'

interface SutTypes {
  sut: ApolloServerTestClient
  arcsecondApiStub: ArcsecondApi
}

const makeSut = (): SutTypes => {
  const arcsecondApiStub = new ArcsecondApi()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        arcsecondApi: arcsecondApiStub
      }
    }
  })
  const sut = createTestClient(server)
  return {
    sut,
    arcsecondApiStub
  }
}

describe('Planet', () => {
  test('Should return suitable planets', async () => {
    const { sut, arcsecondApiStub } = makeSut()
    const SUITABLE_PLANETS_QUERY = `
        query {
            suitablePlanets(pages: 1) {
                name,
                mass
            }
        }
    `
    jest.spyOn(arcsecondApiStub, 'getRequest').mockReturnValueOnce(new Promise((resolve) => resolve({
      count: 1234,
      next: 'any_next',
      previous: 'any_previous',
      results: [
        {
          name: 'any_name',
          mass: {
            unit: 'any_unit',
            value: 12
          }
        },
        {
          name: 'other_name',
          mass: {
            unit: 'any_unit',
            value: 32
          }
        }
      ]
    })))
    const res = await sut.query({ query: SUITABLE_PLANETS_QUERY })
    expect(res).toMatchSnapshot()
    expect(res.data.suitablePlanets.length).toBe(1)
  })
})
