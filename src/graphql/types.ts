import { Game, Developer, PrismaClient } from "@prisma/client"
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, graphql, GraphQLScalarType, Kind, GraphQLInt } from "graphql"
import { IUrl } from "../models/urlSchema"
import { IUser } from "../models/userSchema"

const prisma = new PrismaClient()

const dateScalar = new GraphQLScalarType<any, any>({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: any) {
        return value.toLocaleDateString('en-za', {dateStyle: 'full'}); // Convert outgoing Date to string for JSON
    },
    parseValue(value: any) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast: any) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

const GameType: GraphQLObjectType<Game> = new GraphQLObjectType<Game>({
    name: 'Game',
    fields: () => ({
        gameId: { type: GraphQLID },
        title: { type: GraphQLString },
        summary: { type: GraphQLString },
        banner: { type: GraphQLString },
        trailer: { type: GraphQLString },
        releaseDate: { type: dateScalar },
        genres: { type: new GraphQLList(GraphQLString) },
        images: { type: new GraphQLList(GraphQLString) },
        Developer: {
            type: DevType,
            resolve(parent, args) {
                return prisma.developer.findUnique({
                    where: {
                        developerId: parent.developerId
                    }
                })
            }
        },
        Publisher: {
            type: PubType,
            resolve(parent, args) {
                return prisma.publisher.findUnique({
                    where: {
                        publisherId: parent.publisherId
                    }
                })
            }
        },
    })
})

const DevType: GraphQLObjectType<Developer, any> = new GraphQLObjectType<Developer>({
    name: 'Developer',
    fields: () => ({
        developerId: { type: GraphQLID },
        name: { type: GraphQLString },
        logo: { type: GraphQLString },
        summary: { type: GraphQLString },
        location: { type: GraphQLString },
        country: { type: GraphQLString },
        games: {
            type: new GraphQLList(GameType),
            async resolve(parent, args) {
                return await prisma.game.findMany({
                    where: {
                        developerId: parent.developerId
                    }
                })
            }
        }
    })
})

const PubType = new GraphQLObjectType({
    name: 'Publisher',
    fields: () => ({
        publisherId: { type: GraphQLID },
        name: { type: GraphQLString },
        logo: { type: GraphQLString },
        summary: { type: GraphQLString },
        headquarters: { type: GraphQLString },
        country: { type: GraphQLString },
        games: {
            type: new GraphQLList(GameType),
            async resolve(parent, args) {
                return await prisma.game.findMany({
                    where: {
                        publisherId: parent.publisherId
                    }
                })
            }
        },
    })
})

const PlatformType = new GraphQLObjectType({
    name: 'Platform',
    fields: () => ({
        platformId: { type: GraphQLID },
        name: { type: GraphQLString },
        logo: { type: GraphQLString },
        summary: { type: GraphQLString },
        release: { type: dateScalar }
    })
})

const UrlType = new GraphQLObjectType<IUrl>({
    name: 'URL',
    fields: () => ({
        original: { type: GraphQLString },
        short: { type: GraphQLString }
    })
})

const UserType = new GraphQLObjectType<IUser>({
    name: 'User',
    fields: ({
        username: { type: GraphQLString },
        id: { type: GraphQLString },
        log: {
            type: new GraphQLList(new GraphQLObjectType({
                name: 'Log',
                fields: {
                    description: { type: GraphQLString },
                    duration: { type: GraphQLInt },
                    date: { type: dateScalar }
                }
            }))
        }
    })
})


export { PlatformType, PubType, DevType, GameType, UrlType, UserType }