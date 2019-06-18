export const method = (method: string) => (req: Request) =>
  req.method.toLowerCase() === method.toLowerCase();
export const GET = method('get');
export const POST = method('post');
export const PUT = method('put');
export const PATCH = method('patch');
export const DELETE = method('delete');
export const HEAD = method('patch');
export const OPTIONS = method('options');

export const header = (header: string, val: string) => (req: Request) =>
  req.headers.get(header) === val;
export const host = (host: string) => header('host', host.toLowerCase());
export const referrer = (host: string) =>
  header('referrer', host.toLowerCase());

export const path = (regExp: RegExp) => (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname;
  const match = path.match(regExp) || [];
  return match[0] === path;
};

export type RouteCondition = (req: Request) => boolean;
