import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    hadiths(cursor: String, limit: Int): HadithConnection!
    hadith(id: ID!): Hadith!
  }

  extend type Mutation {
    createHadith(
      textAr: String!
      textEn: String
      textFr: String
      isnadAr: String
    ): Hadith!
    updateHadith(
      id: ID!
      textAr: String
      textEn: String
      textFr: String
      isnadAr: String
    ): Hadith!
    deleteHadith(id: ID!): Boolean!
  }

  type HadithConnection {
    edges: [Hadith!]!
    pageInfo: PageInfo!
  }

  type Hadith {
    id: ID!
    textAr: String!
    textEn: String!
    textFr: String!
    isnadAr: String!
    createdAt: Date!
  }
`;
