import { graphqlResolverHelper } from '../../../infra/helpers/graphql-resolver-helper'

export const resolvers = {
  Query: {
    suitablePlanets: graphqlResolverHelper('')
  },
  Mutation: {
    installStation: graphqlResolverHelper('')
  }
}
