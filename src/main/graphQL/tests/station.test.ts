import {
  createTestClient,
  ApolloServerTestClient
} from 'apollo-server-testing'
import ArcsecondApi from '../../../infra/db/arcsecond/helpers/arcsecond-api'
import { typeDefs, resolvers } from '../'
import { ApolloServer } from 'apollo-server'
import { PrismaHelper } from '../../../infra/db/postgresql/helpers/prismaHelper'

beforeAll(async () => {
  await PrismaHelper.connect()
})

afterAll(async () => {
  await PrismaHelper.disconnect()
})

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

describe('Station', () => {
  test('Should add a new Station', async () => {
    const { sut } = makeSut()
    const INSTALL_STATION = `
      mutation InstallStation($input: StationInput!) {
        installStation(input: $input) {
          id,
          name,
          planet
        }
      }
    `
    const res = await sut.mutate({
      mutation: INSTALL_STATION,
      variables: { input: { name: 'any_name', planet: 'any_planet' } }
    })
    expect(res).toMatchSnapshot()
    expect(res.data.installStation.id).toBe('1')
    expect(res.data.installStation.name).toBe('any_name')
    expect(res.data.installStation.planet).toBe('any_planet')
  })
})
