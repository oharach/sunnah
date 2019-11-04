import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    authors: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              $lt: fromCursorHash(cursor),
            },
          }
        : {};
      const authors = await models.Author.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = authors.length > limit;
      const edges = hasNextPage ? authors.slice(0, -1) : authors;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    author: async (parent, { id }, { models }) => {
      return await models.Author.findById(id);
    },
  },

  Mutation: {
    createAuthor: combineResolvers(
      isAuthenticated,
      async (parent, { shortname, longname }, { models }) => {
        const author = await models.Author.create({
          shortname,
          longname
        });

        return author;
      },
    ),

    updateAuthor: combineResolvers(
      isAuthenticated,
      async (parent, { id, shortname, longname }, { models }) => {
        return await models.Author.findByIdAndUpdate(
          id,
          { shortname, longname },
          { new: true },
        );
      },
    ),

    deleteAuthor: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const author = await models.Author.findById(id);

        if (author) {
          await author.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },
};
