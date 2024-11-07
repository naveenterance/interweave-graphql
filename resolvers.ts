import { PrismaClient, User } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define argument types for each resolver
type WelcomeArgs = {
  name: string;
};

type UserArgs = {
  id: string;
};

type CreateUserArgs = {
  name: string;
  password: string;
  cart: string[];
};

type UpdateUserArgs = {
  id: string;
  name?: string;
  password?: string;
  cart?: string[];
};

// Define resolver types
export const resolvers = {
  Query: {
    hello: (): string => "Hello ",
    welcome: (parent: undefined, args: WelcomeArgs): string =>
      `Hello ${args.name}`,
    users: async (): Promise<User[]> => await prisma.user.findMany(),
    user: async (parent: undefined, args: UserArgs): Promise<User | null> =>
      await prisma.user.findUnique({ where: { id: args.id } }),
  },
  Mutation: {
    create: async (parent: undefined, args: CreateUserArgs): Promise<User> => {
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
    update: async (
      parent: undefined,
      args: UpdateUserArgs
    ): Promise<User | null> => {
      const { id, ...data } = args;
      return await prisma.user.update({
        where: { id },
        data,
      });
    },
    delete: async (parent: undefined, args: UserArgs): Promise<User | null> => {
      return await prisma.user.delete({
        where: { id: args.id },
      });
    },
  },
};
