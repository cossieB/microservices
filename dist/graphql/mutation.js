"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
const graphql_1 = require("graphql");
const urlSchema_1 = require("../models/urlSchema");
const types_1 = require("./types");
const whatwg_url_1 = __importDefault(require("whatwg-url"));
const dns_1 = __importDefault(require("dns"));
const userSchema_1 = require("../models/userSchema");
exports.mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUrl: {
            type: types_1.UrlType,
            args: {
                original: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            async resolve(_parent, args) {
                const dnsPromise = dns_1.default.promises;
                const original = args.original;
                let doc = await urlSchema_1.URLModel.findOne({ original });
                if (doc) {
                    return doc;
                }
                let q;
                // Check if given URL is valid. If not throw exception
                try {
                    q = new whatwg_url_1.default.URL(original);
                    await dnsPromise.lookup(q.hostname);
                }
                catch (e) {
                    console.log(e);
                    throw e;
                }
                const allUrls = await urlSchema_1.URLModel.find();
                let short = `/api/url/${allUrls.length}`;
                let url = new urlSchema_1.URLModel({ original, short });
                await url.save();
                return url;
            }
        },
        addUser: {
            type: types_1.UserType,
            args: { username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) } },
            resolve(_parent, args) {
                const user = new userSchema_1.Users({ username: args.username });
                return user.save();
            }
        },
        addExercise: {
            type: types_1.UserType,
            args: {
                userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                duration: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                date: { type: graphql_1.GraphQLString },
            },
            async resolve(_parent, args) {
                const { userId, description, duration, date } = args;
                if (!duration || Number.isNaN(Number(duration))) {
                    throw new Error('Invalid Duration');
                }
                if (!description) {
                    throw new Error('Description required');
                }
                let dateTemp = date ? Date.parse(date) : Date.now();
                if (Number.isNaN(dateTemp))
                    throw new Error('Invalid Date');
                let newDate = new Date(dateTemp);
                let user = await userSchema_1.Users.findById(userId).catch(() => null);
                if (!user)
                    throw new Error('User not found');
                let obj = { description, duration, date: newDate };
                user.log.push(obj);
                return await user.save();
            }
        }
    }
});
