import "reflect-metadata";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { join } from "path";
const parentDir = join(__dirname, "..");

const connectionOpts: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "00.00.00",
  port: Number(process.env.DB_PORT) || 5449,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "probe_local_dev",
  // entities: [`${parentDir}/**/*-entity.ts`],
  synchronize: false
};

export const connection = async () => {
  const createdConnection: Connection = await createConnection(connectionOpts);

  return createConnection;
};
// export const dbConnection = createConnection(connectionOpts);
