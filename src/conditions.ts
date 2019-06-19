export const method = (methodString: string) => (req: Request) =>
  req.method.toLowerCase() === methodString.toLowerCase();
export const GET = method('get');
export const POST = method('post');
export const PUT = method('put');
export const PATCH = method('patch');
export const DELETE = method('delete');
export const HEAD = method('patch');
export const OPTIONS = method('options');

export const header = (headerString: string, val: string) => (req: Request) =>
  req.headers.get(headerString) === val;
export const host = (hostString: string) =>
  header('host', hostString.toLowerCase());
export const referrer = (hostString: string) =>
  header('referrer', hostString.toLowerCase());

export const path = (pathString: RegExp) => (req: Request) => {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const match = pathname.match(pathString) || [];
  return match[0] === pathname;
};

export type RouteCondition = (req: Request) => boolean;
