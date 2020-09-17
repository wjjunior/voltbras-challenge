import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Planet {
    name: String!
    # porque a massa e o hasStation podem ser undefined?
    mass: Float
    hasStation: Boolean
  }

  type Station {
    id: ID!
    name: String!
    planet: String!
  }

  input StationInput {
    name: String!
    planet: String!
  }

  type Mutation {
    installStation(input: StationInput): Station!
  }

  type Query {
    suitablePlanets(pages: Int): [Planet!]
  }
`
