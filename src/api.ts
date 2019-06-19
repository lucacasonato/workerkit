import { KV } from './kv';

export class API {
  public accountID: string;
  private apiEmail: string;
  private apiKey: string;

  constructor(accountID: string, apiEmail: string, apiKey: string) {
    this.accountID = accountID;
    this.apiEmail = apiEmail;
    this.apiKey = apiKey;
  }

  /**
   * Make an authenticated GET request to the Cloudlare API
   */
  public async get(url: string): Promise<any> {
    return this.request(url, {
      method: 'GET',
    });
  }

  /**
   * Make an authenticated POST request to the Cloudlare API
   */
  public post(url: string, data: any) {
    const dataType = typeof data;

    return this.request(url, {
      body: dataType === 'string' ? data : JSON.stringify(data),
      headers: {
        'content-type':
          dataType === 'string' ? 'text/plain' : 'application/json',
      },
      method: 'POST',
    });
  }

  /**
   * Make an authenticated PUT request to the Cloudlare API
   */
  public put(url: string, data: any) {
    return this.request(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'PUT',
    });
  }

  /**
   * Make an authenticated GET request to the Cloudlare API
   */
  public async delete(url: string): Promise<any> {
    return this.request(url, {
      method: 'DELETE',
    });
  }

  /**
   * Get a list of all KV namespaces
   */
  public async kv_list(
    page?: number,
    perPage?: number
  ): Promise<Array<{ id: string; title: string }>> {
    const querys = [];

    if (page) {
      querys.push('page=' + page.toString());
    }
    if (perPage) {
      querys.push('per_page=' + perPage.toString());
    }

    const data = await this.get(`/storage/kv/namespaces?${querys.join('&')}`);

    if (data && typeof data === 'object' && data.success && data.result) {
      return data.result;
    }

    return [];
  }

  /**
   * Get a KV namespace
   */
  public kv_get(id: string): KV {
    return new KV(this, id);
  }

  /**
   * Create a KV namespace
   */
  public async kv_create(title: string): Promise<KV> {
    const data = await this.post(`/storage/kv/namespaces`, {
      title,
    });

    if (
      data &&
      typeof data === 'object' &&
      data.success &&
      data.result &&
      data.result.id
    ) {
      return new KV(this, data.result.id);
    }

    throw Error('Could not create workspace.');
  }

  /**
   * Remove a KV namespace
   */
  public async kv_remove(id: string): Promise<void> {
    const data = await this.delete(`/storage/kv/namespaces/${id}`);

    if (data && typeof data === 'object' && data.success) {
      return;
    }

    throw Error('Could not remove workspace.');
  }

  /**
   * Rename a KV namespace
   */
  public async kv_rename(id: string, newTitle: string): Promise<void> {
    const data = await this.put(`/storage/kv/namespaces/${id}`, {
      title: newTitle,
    });

    if (data && typeof data === 'object' && data.success) {
      return;
    }

    throw Error('Could not remove workspace.');
  }

  private get authHeaders(): {
    'X-Auth-Email': string;
    'X-Auth-Key': string;
  } {
    return {
      'X-Auth-Email': this.apiEmail,
      'X-Auth-Key': this.apiKey,
    };
  }

  private async request(url: string, init: RequestInit): Promise<any> {
    const resp = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.accountID}${url}`,
      {
        ...init,
        headers: {
          ...init.headers,
          ...this.authHeaders,
        },
      }
    );

    if (!resp.ok) {
      throw Error('Fetch did not return with an OK status code.');
    }

    const contentType = resp.headers.get('content-type');
    if (contentType && contentType.includes('text/plain')) {
      return resp.text();
    } else if (contentType && contentType.includes('application/json')) {
      return resp.json();
    }

    return null;
  }
}
