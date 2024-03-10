// resolvers.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    hello: () => "Hello ",
    welcome: (parent, { name }) => `Hello ${name}`,
    users: async () => await prisma.user.findMany(),
    user: async (parent, { id }) =>
      await prisma.user.findUnique({ where: { id } }),
  },
  Mutation: {
    create: async (parent, args) => {
      const { name, password, cart } = args;
      const user = await prisma.user.create({
        data: {
          name,
          password,
          cart,
        },
        select: {
          id: true,
          name: true,
          password: true,
          cart: true,
        },
      });
      return user;
    },
    update: async (parent, args) => {
      const { id, ...data } = args;
      return await prisma.user.update({
        where: { id },
        data,
      });
    },
    delete: async (parent, { id }) => {
      return await prisma.user.delete({
        where: { id },
      });
    },
  },
};

module.exports = { resolvers };
