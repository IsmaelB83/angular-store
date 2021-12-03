// Node imports
import { Pool } from "pg";
// Own imports
import config from "../config";

const Client = new Pool({
  host: config.POSTGRES_HOST,
  port: parseInt(config.POSTGRES_PORT as string),
  database: config.POSTGRES_DB,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
});

export default Client;
