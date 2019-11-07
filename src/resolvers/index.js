import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import authorResolvers from './author';
import hadithResolvers from './hadith';
import commentResolvers from './comment';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  authorResolvers,
  hadithResolvers,
  commentResolvers,
];
