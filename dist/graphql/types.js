"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.UrlType = exports.GameType = exports.DevType = exports.PubType = exports.PlatformType = void 0;
const client_1 = require("@prisma/client");
const graphql_1 = require("graphql");
const prisma = new client_1.PrismaClient();
const dateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.toLocaleDateString('en-za', { dateStyle: 'full' }); // Convert outgoing Date to string for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});
const GameType = new graphql_1.GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        gameId: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        summary: { type: graphql_1.GraphQLString },
        banner: { type: graphql_1.GraphQLString },
        trailer: { type: graphql_1.GraphQLString },
        releaseDate: { type: dateScalar },
        genres: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        images: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        Developer: {
            type: DevType,
            resolve(parent, args) {
                return prisma.developer.findUnique({
                    where: {
                        developerId: parent.developerId
                    }
                });
            }
        },
        Publisher: {
            type: PubType,
            resolve(parent, args) {
                return prisma.publisher.findUnique({
                    where: {
                        publisherId: parent.publisherId
                    }
                });
            }
        },
    })
});
exports.GameType = GameType;
const DevType = new graphql_1.GraphQLObjectType({
    name: 'Developer',
    fields: () => ({
        developerId: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        logo: { type: graphql_1.GraphQLString },
        summary: { type: graphql_1.GraphQLString },
        location: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        games: {
            type: new graphql_1.GraphQLList(GameType),
            async resolve(parent, args) {
                return await prisma.game.findMany({
                    where: {
                        developerId: parent.developerId
                    }
                });
            }
        }
    })
});
exports.DevType = DevType;
const PubType = new graphql_1.GraphQLObjectType({
    name: 'Publisher',
    fields: () => ({
        publisherId: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        logo: { type: graphql_1.GraphQLString },
        summary: { type: graphql_1.GraphQLString },
        headquarters: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        games: {
            type: new graphql_1.GraphQLList(GameType),
            async resolve(parent, args) {
                return await prisma.game.findMany({
                    where: {
                        publisherId: parent.publisherId
                    }
                });
            }
        },
    })
});
exports.PubType = PubType;
const PlatformType = new graphql_1.GraphQLObjectType({
    name: 'Platform',
    fields: () => ({
        platformId: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        logo: { type: graphql_1.GraphQLString },
        summary: { type: graphql_1.GraphQLString },
        release: { type: dateScalar }
    })
});
exports.PlatformType = PlatformType;
const UrlType = new graphql_1.GraphQLObjectType({
    name: 'URL',
    fields: () => ({
        original: { type: graphql_1.GraphQLString },
        short: { type: graphql_1.GraphQLString }
    })
});
exports.UrlType = UrlType;
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: ({
        username: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
        log: {
            type: new graphql_1.GraphQLList(new graphql_1.GraphQLObjectType({
                name: 'Log',
                fields: {
                    description: { type: graphql_1.GraphQLString },
                    duration: { type: graphql_1.GraphQLInt },
                    date: { type: dateScalar }
                }
            }))
        }
    })
});
exports.UserType = UserType;
