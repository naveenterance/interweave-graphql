"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const client_1 = require("@prisma/client");
// Initialize Prisma Client
const prisma = new client_1.PrismaClient();
// Define resolver types
exports.resolvers = {
    Query: {
        hello: () => "Hello",
        welcome: (parent, args) => `Hello ${args.name}`,
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany();
                console.log("Fetched users from Prisma:", users);
                return users;
            }
            catch (error) {
                console.error("Error fetching users:", error.message);
                console.error("Detailed Error:", JSON.stringify(error, null, 2));
                throw new Error("Failed to fetch users");
            }
        }),
        user: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield prisma.user.findUnique({ where: { id: args.id } });
            }
            catch (error) {
                console.error("Error fetching user:", error);
                throw new Error("Failed to fetch user");
            }
        }),
    },
    Mutation: {
        create: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, password, email, avatar, cart } = args;
            try {
                const user = yield prisma.user.create({
                    data: {
                        name,
                        password,
                        email,
                        avatar,
                        cart,
                    },
                });
                return user;
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw new Error("Failed to create user");
            }
        }),
        update: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args, data = __rest(args, ["id"]);
            try {
                return yield prisma.user.update({
                    where: { id },
                    data,
                });
            }
            catch (error) {
                console.error("Error updating user:", error);
                throw new Error("Failed to update user");
            }
        }),
        delete: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield prisma.user.delete({
                    where: { id: args.id },
                });
            }
            catch (error) {
                console.error("Error deleting user:", error);
                throw new Error("Failed to delete user");
            }
        }),
    },
};
