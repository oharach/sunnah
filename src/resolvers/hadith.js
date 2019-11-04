import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    hadiths: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              $lt: fromCursorHash(cursor),
            },
          }
        : {};
      const hadiths = await models.Hadith.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = hadiths.length > limit;
      const edges = hasNextPage ? hadiths.slice(0, -1) : hadiths;

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
    hadith: async (parent, { id }, { models }) => {
      return await models.Hadith.findById(id);
    },
  },

  Mutation: {
    createHadith: combineResolvers(
      isAuthenticated,
      async (parent, { textAr, textEn, textFr, isnadAr }, { models }) => {
        const hadith = await models.Hadith.create({
          textAr,
          textEn,
          textFr,
          isnadAr
        });

        return hadith;
      },
    ),

    updateHadith: combineResolvers(
      isAuthenticated,
      async (parent, { id, textAr, textEn, textFr, isnadAr }, { models }) => {
        return await models.Hadith.findByIdAndUpdate(
          id,
          { textAr, textEn, textFr, isnadAr },
          { new: true },
        );
      },
    ),

    deleteHadith: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const hadith = await models.Hadith.findById(id);

        if (hadith) {
          await hadith.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },
};
