import { only } from "@mongez/reinforcements";
import Validator from "core/validator";
import UploadedFile from "./UploadedFile";

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
    if (this.handler.validation) {
      const validator = new Validator(this.handler.validation.rules);

      await validator.scan(); // start scanning the rules

      if (validator.fails()) {
        return this.response.status(422).send({
          errors: validator.errors(),
        });
      }
    }

    return await this.handler(this, this.response);
  }

  /**
   * Get only the given keys from the request
   */
  public only(keys: string[]) {
    return only(this.all(), keys);
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
        body[key] = data.map(this.parseInputValue.bind(this));
      } else {
        body[key] = this.parseInputValue(data);
      }
    }

    return body;
  }

  /**
   * Parse the given data
   */
  private parseInputValue(data: any) {
    // data.value appears only in the multipart form data
    // if it json, then just return the data
    if (data.file) return data;

    if (data.value !== undefined) return data.value;

    return data;
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
   * Get Uploaded file instance
   */
  public file(key: string): UploadedFile | null {
    const file = this.input(key);

    return file ? new UploadedFile(file) : null;
  }
}

const request = new Request();

export default request;
