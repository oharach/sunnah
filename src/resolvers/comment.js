import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    comments: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              $lt: fromCursorHash(cursor),
            },
          }
        : {};
      const comments = await models.Comment.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = comments.length > limit;
      const edges = hasNextPage ? comments.slice(0, -1) : comments;

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
    comment: async (parent, { id }, { models }) => {
      return await models.Comment.findById(id);
    },
  },

  Mutation: {
    createComment: combineResolvers(
      isAuthenticated,
      async (parent, { textAr, textEn, textFr, authorId, hadithId }, { models }) => {
        const comment = await models.Comment.create({
          textAr,
          textEn,
          textFr,
          authorId,
          hadithId
        });

        return comment;
      },
    ),

    updateComment: combineResolvers(
      isAuthenticated,
      async (parent, { id, textAr, textEn, textFr, authorId, hadithId }, { models }) => {
        return await models.Comment.findByIdAndUpdate(
          id,
          { textAr, textEn, textFr, authorId, hadithId },
          { new: true },
        );
      },
    ),

    deleteComment: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const comment = await models.Comment.findById(id);

        if (comment) {
          await comment.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },
};
