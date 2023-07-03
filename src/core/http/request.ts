export class Request {
  /**
   * Fastify Request instance
   */
  public request: any;

  /**
   * Fastify response instance
   */
  public response: any;

  /**
   * Request handler
   */
  public handler: any;

  /**
   * Set request instance
   */
  public setRequest(request: any) {
    this.request = request;

    return this;
  }

  /**
   * Set response instance
   */
  public setResponse(response: any) {
    this.response = response;

    return this;
  }

  /**
   * Set handler instance
   */
  public setHandler(handler: any) {
    this.handler = handler;

    return this;
  }

  /**
   * Execute handler
   */
  public async execute() {
    return await this.handler(this, this.response);
  }

  /**
   * Get the value of the given key from the request body, query or params
   */
  public input(key: string, defaultValue?: any) {
    return (
      this.params[key] || this.body[key] || this.query[key] || defaultValue
    );
  }

  /**
   * Get all inputs from the request body, query or params
   */
  public all() {
    return {
      ...this.params,
      ...this.body,
      ...this.query,
    };
  }

  /**
   * Get the request params
   */
  public get params() {
    return this.request.params;
  }

  /**
   * Get the request body
   */
  public get body() {
    const body: any = {};

    for (const key in this.request.body) {
      const data = this.request.body[key];

      if (Array.isArray(data)) {
        body[key] = data.map(this.parseBodyValue.bind(this));
      } else {
        body[key] = this.parseBodyValue(data);
      }
    }

    return body;
  }

  /**
   * Parse the body value
   */
  private parseBodyValue(data: any) {
    if (data.file) {
      return {
        file: data.file,
        filename: data.filename,
        mimetype: data.mimetype,
      };
    }

    return data.value || data;
  }

  /**
   * Get the request query
   */
  public get query() {
    return this.request.query;
  }

  /**
   * Get the boolean value of the given key from the request body, query or params
   */
  public bool(key: string, defaultValue?: false) {
    const value = this.input(key, defaultValue);

    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }

    return Boolean(value);
  }

  /**
   * Get the integer value of the given key from the request body, query or params
   */
  public int(key: string, defaultValue = 0) {
    const value = this.input(key, defaultValue);

    return parseInt(value);
  }

  /**
   * Get the float value of the given key from the request body, query or params
   */
  public float(key: string, defaultValue = 0) {
    const value = this.input(key, defaultValue);

    return parseFloat(value);
  }

  /**
   * Get the number value of the given key from the request body, query or params
   */
  public number(key: string, defaultValue = 0) {
    const value = this.input(key, defaultValue);

    return Number(value);
  }

  /**
   * Get the file value of the given key from the request body, query or params
   */
  public file(key: string) {
    return this.request.body[key];
  }
}

const request = new Request();

export default request;
