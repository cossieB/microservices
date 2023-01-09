export const typeDefs = `#graphql
    type Developer {
        developerId: ID!
        name: String!
        logo: String!
        summary: String!
        location: String!
        country: String!
        games: [Game]!
    }

    type Publisher {
        publisherId: ID!
        name: String!
        logo: String!
        summary: String!
        headquarters: String!
        country: String!
        games: [Game]!
    }

    type Game {
        gameId: ID!
        title: String!
        summary: String!
        banner: String!
        trailer: String!
        releaseDate: String!
        genres: [String]!
        images: [String]!
        developer: Developer!
        publisher: Publisher!
    }

    type Platform {
        platformId: String!
        name: String!
        logo: String!
        summary: String!
        release: String!
    }

    type Query {
        game(id: ID!): Game
        games: [Game!]!
        developer(id: ID!): Developer
        developers: [Developer!]!
        publisher(id: ID!): Publisher
        publishers: [Publisher!]!
        platform(id: ID!): Platform
        platforms: [Platform!]!
  }
`;
