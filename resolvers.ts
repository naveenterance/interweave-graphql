import { PrismaClient, User } from "@prisma/client";

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
  email: string;
  avatar: string;
  cart: string[];
};

type UpdateUserArgs = {
  id: string;
  name?: string;
  password?: string;
  avatar?: string;
  cart?: string[];
};

// Define resolver types
export const resolvers = {
  Query: {
    hello: (): string => "Hello",
    welcome: (parent: undefined, args: WelcomeArgs): string =>
      `Hello ${args.name}`,
    users: async (): Promise<User[]> => {
      try {
        const users = await prisma.user.findMany();
        console.log("Fetched users from Prisma:", users);
        return users;
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
        console.error("Detailed Error:", JSON.stringify(error, null, 2));
        throw new Error("Failed to fetch users");
      }
    },

    user: async (parent: undefined, args: UserArgs): Promise<User | null> => {
      try {
        return await prisma.user.findUnique({ where: { id: args.id } });
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
      }
    },
  },
  Mutation: {
    create: async (parent: undefined, args: CreateUserArgs): Promise<User> => {
      const { name, password, email, avatar, cart } = args;
      try {
        const user = await prisma.user.create({
          data: {
            name,
            password,
            email,
            avatar,
            cart,
          },
        });
        return user;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
      }
    },
    update: async (
      parent: undefined,
      args: UpdateUserArgs
    ): Promise<User | null> => {
      const { id, ...data } = args;
      try {
        return await prisma.user.update({
          where: { id },
          data,
        });
      } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
      }
    },
    delete: async (parent: undefined, args: UserArgs): Promise<User | null> => {
      try {
        return await prisma.user.delete({
          where: { id: args.id },
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
      }
    },
  },
};
