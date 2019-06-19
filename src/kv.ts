import { API } from './api';

export class KV {
  public api: API;
  public namespaceID: string;

  constructor(api: API, namespaceID: string) {
    this.api = api;
    this.namespaceID = namespaceID;
  }

  /**
   * List all keys in a namespace
   *
   * @argument prefix returns only keys starting with that prefix (default 1000) (min 10) (max 1000)
   * @argument limit is the amount of keys to return
   * @argument cursor is the key to start returning from
   */
  public async keys(
    prefix?: string,
    limit?: number,
    cursor?: string
  ): Promise<
    Array<{
      name: string;
      expiration: number;
    }>
  > {
    const querys = [];

    if (prefix) {
      querys.push('prefix=' + prefix.toString());
    }
    if (limit) {
      querys.push('limit=' + limit.toString());
    }
    if (cursor) {
      querys.push('cursor=' + cursor.toString());
    }

    const data = await this.api.get(
      `/storage/kv/namespaces/${this.namespaceID}/keys?${querys.join('&')}`
    );

    if (data && typeof data === 'object' && data.success && data.result) {
      return data.result;
    }

    return [];
  }

  /**
   * Get a value for a specified key
   */
  public async get(key: string): Promise<any> {
    const data = await this.api.get(
      `/storage/kv/namespaces/${this.namespaceID}/values/${key}`
    );

    return data;
  }

  /**
   * Get a value for a specified key
   */
  public async set(
    key: string,
    value: string,
    expiration?: number,
    ttl?: boolean
  ): Promise<void> {
    const querys = [];

    if (expiration) {
      querys.push(
        (ttl ? 'expiration_ttl' : 'expiration') + '=' + expiration.toString()
      );
    }

    await this.api.put(
      `/storage/kv/namespaces/${this.namespaceID}/values/${key}?${querys.join(
        '&'
      )}`,
      value
    );

    return;
  }

  /**
   * Get a value for a specified key
   */
  public async delete(key: string): Promise<void> {
    await this.api.delete(
      `/storage/kv/namespaces/${this.namespaceID}/values/${key}`
    );

    return;
  }
}
