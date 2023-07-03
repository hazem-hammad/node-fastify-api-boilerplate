import database from "core/database/database";
import { Request } from "core/http/request";

export default class UserController {
  public async index(request: any) {
    const userCollection = database.collection("users");

    const users = await userCollection.find({}).toArray();

    return {
      users,
    };
  }

  public show(request: any) {
    return {
      id: request.params.id,
    };
  }

  public async store(request: Request) {
    // const name = request.input("name");
    // const email = request.input("email");
    // const address = request.input("address");

    console.log(request.body);

    // const result = await userCollection.insertOne({
    //   name,
    //   email,
    //   published: false,
    // });

    return {
      user: {
        done: true,
      },
    };
  }
}
