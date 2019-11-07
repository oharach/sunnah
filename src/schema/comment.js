import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    comments(cursor: String, limit: Int): CommentConnection!
    comment(id: ID!): Comment!
  }

  extend type Mutation {
    createComment(
      textAr: String!
      textEn: String
      textFr: String
      author: ID!
      hadith: ID!
    ): Comment!
    updateComment(
      id: ID!
      textAr: String
      textEn: String
      textFr: String
      author: ID!
      hadith: ID!
    ): Comment!
    deleteComment(id: ID!): Boolean!
  }

  type CommentConnection {
    edges: [Comment!]!
    pageInfo: PageInfo!
  }

  type Comment {
    id: ID!
    textAr: String!
    textEn: String!
    textFr: String!
    createdAt: Date!
    author: Author!
    hadith: Hadith!
  }
`;
