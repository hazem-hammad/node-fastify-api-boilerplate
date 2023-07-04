import { env } from "@mongez/dotenv";

const appCongratulations = {
  app_name: env("APP_NAME", "Test App"),
  port: env("PORT", "3000"),
};

export default appCongratulations;
