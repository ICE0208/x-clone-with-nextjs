import { PrismaClient } from "@prisma/client";

// declare global {
//   var client: PrismaClient | undefined;
// }

// const client = global.client || new PrismaClient();
// if (process.env.NODE_ENV === "development") global.client = client;

const client = new PrismaClient();

export default client;
