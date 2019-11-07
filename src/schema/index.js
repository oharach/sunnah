import { gql } from 'apollo-server-express';

import userSchema from './user';
import authorSchema from './author';
import hadithSchema from './hadith';
import commentSchema from './comment';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, authorSchema, hadithSchema, commentSchema];
