import { Router, RouteHandler } from './router';

export class Route {
  private url: string;
  private router: Router;

  constructor(router: Router, url: string) {
    this.router = router;
    this.url = url;
  }

  /**
   * Adds a new route for GET on the specified URL
   */
  public get(handler: RouteHandler) {
    this.router.get(this.url, handler);

    return this;
  }

  /**
   * Adds a new route for POST on the specified URL
   */
  public post(handler: RouteHandler) {
    this.router.post(this.url, handler);

    return this;
  }

  /**
   * Adds a new route for PUT on the specified URL
   */
  public put(handler: RouteHandler) {
    this.router.put(this.url, handler);

    return this;
  }

  /**
   * Adds a new route for PATCH on the specified URL
   */
  public patch(handler: RouteHandler) {
    this.router.patch(this.url, handler);

    return this;
  }

  /**
   * Adds a new route for DELETE on the specified URL
   */
  public delete(handler: RouteHandler) {
    this.router.delete(this.url, handler);

    return this;
  }

  /**
   * Adds a new route for HEAD on the specified URL
   */
  public head(handler: RouteHandler) {
    this.router.head(this.url, handler);

    return this;
  }

  /**
   * Adds a new route for OPTIONS on the specified URL
   */
  public options(handler: RouteHandler) {
    this.router.options(this.url, handler);

    return this;
  }

  /**
   * Adds a new route for any protocol on the specified URL
   */
  public all(handler: RouteHandler) {
    this.router.any(this.url, handler);

    return this;
  }
}
