import { createTestClient } from 'apollo-server-testing'
import ArcsecondApi from '../../../infra/db/arcsecond/helpers/arcsecond-api'
import { typeDefs, resolvers } from '../'
import { ApolloServer } from 'apollo-server'

describe('Planet', () => {
  test('Should return suitable planets', async () => {
    const arcsecondApi = new ArcsecondApi()

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => {
        return {
          arcsecondApi
        }
      }
    })

    const fakePlanetsQuery = {
      count: 0,
      next: 'any_value',
      previous: 'any_value',
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
    }

    const SUITABLE_PLANETS_QUERY = `
        query {
            suitablePlanets {
                name,
                mass
            }
        }
    `

    arcsecondApi.getRequest = jest.fn(async () => fakePlanetsQuery)

    const { query } = createTestClient(server)

    const res = await query({ query: SUITABLE_PLANETS_QUERY })
    expect(res).toMatchSnapshot()
    expect(res.data.suitablePlanets.length).toBe(2)
  })
})
