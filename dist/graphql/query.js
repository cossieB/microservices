"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const graphql_1 = require("graphql");
const userSchema_1 = require("../models/userSchema");
const mutation_1 = require("./mutation");
const types_1 = require("./types");
const prisma = new client_1.PrismaClient();
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        developer: {
            type: types_1.DevType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) } },
            async resolve(parent, args) {
                try {
                    return await prisma.developer.findUnique({
                        where: {
                            developerId: args.id
                        }
                    });
                }
                catch (e) {
                    throw new Error(e.meta.message || e.meta.cause || e.message || "Something went wrong");
                }
            }
        },
        publisher: {
            type: types_1.PubType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) } },
            async resolve(parent, args) {
                try {
                    return await prisma.publisher.findUnique({
                        where: {
                            publisherId: args.id
                        }
                    });
                }
                catch (e) {
                    throw new Error(e.meta.message || e.meta.cause || e.message || "Something went wrong");
                }
            }
        },
        platform: {
            type: types_1.PlatformType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) } },
            async resolve(parent, args) {
                try {
                    return await prisma.platform.findUnique({
                        where: {
                            platformId: args.id
                        }
                    });
                }
                catch (e) {
                    throw new Error(e.meta.message || e.meta.cause || e.message || "Something went wrong");
                }
            }
        },
        game: {
            type: types_1.GameType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) } },
            async resolve(parent, args) {
                try {
                    return await prisma.game.findUnique({
                        where: {
                            gameId: args.id
                        },
                    });
                }
                catch (e) {
                    throw new Error(e.meta.message || e.meta.cause || e.message || "Something went wrong");
                }
            }
        },
        games: {
            type: new graphql_1.GraphQLList(types_1.GameType),
            resolve() {
                return prisma.game.findMany();
            }
        },
        developers: {
            type: new graphql_1.GraphQLList(types_1.DevType),
            resolve() {
                return prisma.developer.findMany();
            }
        },
        publishers: {
            type: new graphql_1.GraphQLList(types_1.PubType),
            resolve() {
                return prisma.publisher.findMany();
            }
        },
        platforms: {
            type: new graphql_1.GraphQLList(types_1.PlatformType),
            resolve() {
                return prisma.platform.findMany();
            }
        },
        user: {
            type: types_1.UserType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) } },
            resolve(parent, args) {
                return userSchema_1.Users.findById(args.id);
            }
        },
        users: {
            type: new graphql_1.GraphQLList(types_1.UserType),
            resolve() {
                return userSchema_1.Users.find();
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: mutation_1.mutation
});
