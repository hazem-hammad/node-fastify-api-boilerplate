export default class UserController {
  public index(request: any) {
    return request.query;
  }

  public show(request: any) {
    return {
      id: request.params.id,
    };
  }

  public store(request: any) {
    console.log(request.body);
    return {
      done: true,
    };
  }
}
