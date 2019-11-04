import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    authors(cursor: String, limit: Int): AuthorConnection!
    author(id: ID!): Author!
  }

  extend type Mutation {
    createAuthor(
      shortname: String!
      longname: String!
    ): Author!
    updateAuthor(
      id: ID!
      shortname: String!
      longname: String!
    ): Author!
    deleteAuthor(id: ID!): Boolean!
  }

  type AuthorConnection {
    edges: [Author!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Author {
    id: ID!
    shortname: String!
    longname: String!
    createdAt: Date!
  }
`;
