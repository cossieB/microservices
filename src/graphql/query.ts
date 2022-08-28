import { PrismaClient } from '@prisma/client';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { Users } from '../models/userSchema';
import { mutation } from './mutation';
import { DevType, PubType, PlatformType, GameType, UserType } from './types';

const prisma = new PrismaClient();

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        developer: {
            type: DevType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                try {
                    return await prisma.developer.findUnique({
                        where: {
                            developerId: args.id
                        }
                    });
                } catch (e: any) {
                    throw new Error(e.meta.message || e.meta.cause || e.message || "Something went wrong");
                }
            }
        },
        publisher: {
            type: PubType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                try {
                    return await prisma.publisher.findUnique({
                        where: {
                            publisherId: args.id
                        }
                    });
                } catch (e: any) {
                    throw new Error(e.meta.message || e.meta.cause || e.message || "Something went wrong");
                }
            }
        },
        platform: {
            type: PlatformType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                try {
                    return await prisma.platform.findUnique({
                        where: {
                            platformId: args.id
                        }
                    });
                } catch (e: any) {
                    throw new Error(e.meta.message || e.meta.cause || e.message || "Something went wrong");
                }
            }
        },
        game: {
            type: GameType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                try {
                    return await prisma.game.findUnique({
                        where: {
                            gameId: args.id
                        },
                    });
                } catch (e: any) {
                    throw new Error(e.meta.message || e.meta.cause || e.message || "Something went wrong");
                }
            }
        },
        games: {
            type: new GraphQLList(GameType),
            resolve() {
                return prisma.game.findMany()
            }
        },
        developers: {
            type: new GraphQLList(DevType),
            resolve() {
                return prisma.developer.findMany()
            }
        },
        publishers: {
            type: new GraphQLList(PubType),
            resolve() {
                return prisma.publisher.findMany()
            }
        },
        platforms: {
            type: new GraphQLList(PlatformType),
            resolve() {
                return prisma.platform.findMany()
            }
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Users.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return Users.find()
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation
})