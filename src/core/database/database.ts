import { Db } from "mongodb";

export class Database {
  /**
   * MongoDB internal database instance
   */
  public database!: Db;

  /**
   * Set database instance
   */
  public setDatabase(database: Db) {
    this.database = database;
    return this;
  }

  /**
   * Get database collection instance
   */
  public collection(name: string) {
    return this.database.collection(name);
  }
}

const database = new Database();

export default database;
