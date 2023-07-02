import chalk from "chalk";
import { databaseConfigurations } from "config/database";
import database, { Database } from "core/database/database";
import { MongoClient } from "mongodb";

export class Connection {
  /**
   * Mongo client instance
   */
  public client?: MongoClient;

  /**
   * Database instance
   */
  public database?: Database;

  /**
   * Connect to Mongo database
   */
  public async connect() {
    try {
      this.client = await MongoClient.connect(
        `mongodb://${databaseConfigurations.host}:${databaseConfigurations.port}`,
        {
          auth: {
            username: databaseConfigurations.username,
            password: databaseConfigurations.password,
          },
        },
      );

      const mongoDBDatabase = await this.client.db(
        databaseConfigurations.database,
      );

      this.database = database.setDatabase(mongoDBDatabase);

      console.log(chalk.green("Connected!"));
    } catch (error) {
      console.log(error);
    }
  }
}

const connection = new Connection();

export default connection;
