import { path, DELETE, GET, PATCH, POST, RouteCondition } from './conditions';

export interface Route {
  conditions: RouteCondition | RouteCondition[];
  handler: RouteHandler;
}

export type RouteHandler = (req: Request) => Response | Promise<Response>;

export class Router {
  private localRoutes: Route[] = [];

  /**
   * An array of all routes in this worker
   */
  public get routes(): Route[] {
    return this.localRoutes;
  }

  /**
   * Adds a new route with certain conditions
   */
  public handle(
    conditions: RouteCondition | RouteCondition[],
    handler: RouteHandler
  ) {
    this.localRoutes.push({
      conditions,
      handler,
    });
    return this;
  }

  /**
   * Adds a new route for GET on the specified URL
   */
  public get(url: string, handler: RouteHandler) {
    return this.handle([GET, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for POST on the specified URL
   */
  public post(url: string, handler: RouteHandler) {
    return this.handle([POST, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for PATCH on the specified URL
   */
  public patch(url: string, handler: RouteHandler) {
    return this.handle([PATCH, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for DELETE on the specified URL
   */
  public delete(url: string, handler: RouteHandler) {
    return this.handle([DELETE, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for DELETE on the specified URL
   */
  public all(handler: RouteHandler) {
    return this.handle([], handler);
  }
}
