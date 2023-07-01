import { Route } from "./types";

export class Router {
  /**
   * Routes list
   */
  private routes: Route[] = [];

  public static instance: Router;

  /**
   * Get router instance
   */
  public static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }

    return Router.instance;
  }

  private constructor() {
    console.log("constructor");
  }

  /**
   * Add get request method
   */
  public get(path: string, handler: any) {
    this.routes.push({
      method: "GET",
      path,
      handler,
    });

    return this;
  }

  /**
   * Add post request method
   */
  public post(path: string, handler: any) {
    this.routes.push({
      method: "POST",
      path,
      handler,
    });

    return this;
  }

  /**
   * Add put request method
   */
  public put(path: string, handler: any) {
    this.routes.push({
      method: "PUT",
      path,
      handler,
    });

    return this;
  }

  /**
   * Add patch request method
   */
  public patch(path: string, handler: any) {
    this.routes.push({
      method: "PATCH",
      path,
      handler,
    });

    return this;
  }

  /**
   * Add delete request method
   */
  public delete(path: string, handler: any) {
    this.routes.push({
      method: "DELETE",
      path,
      handler,
    });

    return this;
  }

  /**
   * get all routes list
   */
  public list() {
    return this.routes;
  }

  /**
   * Register routes to the server
   */
  public scan(server: any) {
    this.routes.forEach(route => {
      const requestMethod = route.method.toLowerCase();
      const requestMethodFunction = server[requestMethod].bind(server);
      requestMethodFunction(route.path, route.handler);
    });
  }
}

const router = Router.getInstance();

export default router;