import { DELETE, PATCH, POST, GET, RouteCondition, path } from './conditions';

export type Route = {
  conditions: RouteCondition | RouteCondition[];
  handler: RouteHandler;
};

export type RouteHandler = (req: Request) => Response | Promise<Response>;

export class Router {
  private _routes: Route[] = [];

  /**
   * An array of all routes in this worker
   */
  public get routes(): Route[] {
    return this._routes;
  }

  /**
   * Adds a new route with certain conditions
   */
  public handle(
    conditions: RouteCondition | RouteCondition[],
    handler: RouteHandler
  ) {
    this._routes.push({
      conditions,
      handler,
    });
    return this;
  }

  /**
   * Adds a new route for GET on the specified URL
   */
  get(url: string, handler: RouteHandler) {
    return this.handle([GET, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for POST on the specified URL
   */
  post(url: string, handler: RouteHandler) {
    return this.handle([POST, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for PATCH on the specified URL
   */
  patch(url: string, handler: RouteHandler) {
    return this.handle([PATCH, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for DELETE on the specified URL
   */
  delete(url: string, handler: RouteHandler) {
    return this.handle([DELETE, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for DELETE on the specified URL
   */
  all(handler: RouteHandler) {
    return this.handle([], handler);
  }
}
