import graphql, { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLSchema, GraphQLString, Kind } from 'graphql';
import { IUrl, URLModel } from '../models/urlSchema';
import { UrlType, UserType } from './types';
import whatwg from 'whatwg-url'
import dns from 'dns';
import { Users } from '../models/userSchema';

export const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUrl: {
            type: UrlType,
            args: {
                original: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(_parent, args) {
                const dnsPromise = dns.promises
                const original: string = args.original
                let doc = await URLModel.findOne({ original })

                if (doc) {
                    return doc
                }
                let q: whatwg.URL;
                // Check if given URL is valid. If not throw exception
                try {
                    q = new whatwg.URL(original)
                    await dnsPromise.lookup(q.hostname)
                }
                catch (e: any) {
                    console.log(e)
                    throw e
                }
                const allUrls = await URLModel.find();
                let short = `/api/url/${allUrls.length}`
                let url = new URLModel({ original, short })
                await url.save()
                return url
            }
        },
        addUser: {
            type: UserType,
            args:{ username: { type: new GraphQLNonNull(GraphQLString) }},
            resolve(_parent, args) {
                const user = new Users({username: (args.username as string)})
                return user.save()
            }
        },
        addExercise: {
            type: UserType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLString) },
                description: {type: new GraphQLNonNull(GraphQLString) },
                duration: {type: new GraphQLNonNull(GraphQLInt) },
                date: {type: GraphQLString },
            },
            async resolve(_parent, args) {
                const { userId, description, duration, date } = args;
                if (!duration || Number.isNaN(Number(duration))) {
                    throw new Error('Invalid Duration')
                }
                if (!description) {
                    throw new Error('Description required')
                }
                let dateTemp = date ? Date.parse(date) : Date.now()
                if (Number.isNaN(dateTemp)) throw new Error('Invalid Date')
                let newDate = new Date(dateTemp)
                let user = await Users.findById(userId).catch(() => null);
                if (!user) throw new Error('User not found')
                let obj = {description, duration, date: newDate}
                user.log.push(obj)
                return await user.save()
            }
        }
    }

})
