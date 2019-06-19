import {
  path,
  DELETE,
  GET,
  PATCH,
  POST,
  RouteCondition,
  PUT,
  OPTIONS,
  HEAD,
} from './conditions';
import { Route } from './route';

export interface RouteDefinition {
  conditions: RouteCondition | RouteCondition[];
  handler: RouteHandler;
}

export type RouteHandler = (req: Request) => Response | Promise<Response>;

export class Router {
  private routeDefinitions: RouteDefinition[] = [];

  /**
   * An array of all routes in this worker
   */
  public get routes(): RouteDefinition[] {
    return this.routeDefinitions;
  }

  /**
   * Adds a new route with certain conditions
   */
  public handle(
    conditions: RouteCondition | RouteCondition[],
    handler: RouteHandler
  ) {
    this.routeDefinitions.push({
      conditions,
      handler,
    });
    return this;
  }

  /**
   * Handle connections for a specific route
   */
  public route(url: string) {
    return new Route(this, url);
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
   * Adds a new route for PUT on the specified URL
   */
  public put(url: string, handler: RouteHandler) {
    return this.handle([PUT, path(new RegExp(url))], handler);
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
   * Adds a new route for HEAD on the specified URL
   */
  public head(url: string, handler: RouteHandler) {
    return this.handle([HEAD, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for OPTIONS on the specified URL
   */
  public options(url: string, handler: RouteHandler) {
    return this.handle([OPTIONS, path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for any method on the specified URL
   */
  public any(url: string, handler: RouteHandler) {
    return this.handle([path(new RegExp(url))], handler);
  }

  /**
   * Adds a new route for DELETE on the specified URL
   */
  public all(handler: RouteHandler) {
    return this.handle([], handler);
  }
}
