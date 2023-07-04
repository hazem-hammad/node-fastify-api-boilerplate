import { rootPath } from "@mongez/node";
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
    const image = request.file("image");

    if (image) {
      image.saveTo(rootPath("storage/uploads"));
    }

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
