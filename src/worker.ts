import { Router, RouteDefinition } from './router';

/**
 * This handles and routes incoming HTTP requests.
 */
export class Worker {
  private routers: Router[] = [];

  /**
   * Add a router to the worker
   */
  public use(router: Router): Worker {
    this.routers.push(router);
    return this;
  }

  /**
   * An array of all routes in this worker
   */
  public get routes(): RouteDefinition[] {
    return this.routers.flatMap(router => router.routes);
  }

  /**
   * Find a route that matches the request condition(s)
   */
  public resolve(req: Request): RouteDefinition | undefined {
    return this.routes.find(r => {
      if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
        return true;
      }

      if (typeof r.conditions === 'function') {
        return r.conditions(req);
      }

      return r.conditions.every(c => c(req));
    });
  }

  /**
   * This handles an individual request and returns a response.
   */
  public async route(req: Request): Promise<Response> {
    const route = this.resolve(req);

    if (!route) {
      return new Response('resource not found', {
        headers: {
          'content-type': 'text/plain',
        },
        status: 404,
        statusText: 'not found',
      });
    }

    return route.handler(req);
  }

  /**
   * Start listening for events
   */
  public listen(): void {
    addEventListener('fetch', e => {
      const event = e as FetchEvent;
      event.respondWith(this.route(event.request));
    });
  }
}
