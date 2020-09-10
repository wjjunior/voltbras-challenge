import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Planet {
    name: String!
    mass: Float
    hasStation: Boolean
  }

  type Station {
    id: ID!
    planetName: String!
  }

  type Mutation {
    installStation(planetName: String!): Station!
  }

  type Query {
    suitablePlanets: [Planet!]
  }
`
