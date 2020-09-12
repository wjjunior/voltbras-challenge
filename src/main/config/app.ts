import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from '../graphQL'
import ArcsecondApi from '../../infra/db/arcsecond/helpers/arcsecond-api'

const app = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      arcsecondApi: new ArcsecondApi()
    }
  }
})

export default app
