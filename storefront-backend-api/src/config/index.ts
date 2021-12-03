// Node imports
import dotenv from "dotenv";
dotenv.config();

// Determine DDBB based on env variable
let POSTGRES_DB = "";
switch (process.env.ENV) {
  case "dev":
    POSTGRES_DB = process.env.POSTGRES_DB as string;
    break;
  case "test":
    POSTGRES_DB = process.env.POSTGRES_DB_TEST as string;
    break;
}

// Build application config
const config = {
  TYPE: process.env.TYPE,
  PORT: process.env.PORT,
  PRIVATEKEY: process.env.PRIVATEKEY as string,
  CERTIFICATE: process.env.CERTIFICATE as string,
  CA: process.env.CA as string,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DB: POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  BCRYPT_PASSWORD: process.env.BCRYPT_PASSWORD,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
};

export default config;
