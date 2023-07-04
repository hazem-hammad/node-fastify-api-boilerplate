import { env } from "@mongez/dotenv";

export const databaseConfigurations = {
  host: env("DATABASE_HOST", "localhost"),
  username: env("DATABASE_USERNAME", "root"),
  password: env("DATABASE_PASSWORD", "root"),
  port: env("DATABASE_PORT", 27017),
  database: env("DATABASE_NAME", ""),
};
