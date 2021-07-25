import path from 'path';

import AJV, { JSONSchemaType } from 'ajv';
import { Application, Request, Response } from 'express';
interface TypedRequest<B> extends Request {
  body: B;
}

interface TypedResponse<B> extends Response {
  send: (body: B) => this;
}

type SameKeysAs<T> = {
  [key in keyof T]: any;
};

//
export class ValidatedRoutes<ReqTypes extends Record<string, any>, ResTypes extends SameKeysAs<ReqTypes>> {
  app: Application;
  schema: JSONSchemaType<any>;
  baseRoute: string;
  ajv: AJV;

  constructor(app: Application, schema: JSONSchemaType<any>, baseRoute?: string) {
    this.app = app;
    this.schema = schema;
    this.baseRoute = baseRoute || '';
    this.ajv = new AJV();
    this.ajv.addSchema(this.schema);
  }

  public post<R extends keyof ReqTypes>(
    routePath: R,
    handler: (req: TypedRequest<ReqTypes[R]>, res: TypedResponse<ResTypes[R]>) => void
  ) {
    const definitionName = this.getRouteDefinitionName(routePath); // This is whatever the JSON Schema decided to call our route handler
    const validate = this.ajv.getSchema<ReqTypes[R]>(definitionName); // this
    if (!validate) {
      throw new Error('JSON Validator was undefined, is the schema bad?');
    }

    this.app.post(path.join(this.baseRoute, routePath as string), (req, res) => {
      try {
        validate(req.body);
      } catch (e) {
        return res.status(400).send({
          success: false,
          error: e.message,
        });
      }
      return handler(req, res);
    });
  }

  // This should only throw at first run which would be good, it doesnt break during runtime
  getRouteDefinitionName(route: keyof ReqTypes) {
    try {
      // @ts-ignore
      const name = this.schema.definitions.Requests.properties[route].$ref as string | undefined;
      if (!name) {
        throw new Error(
          'No route in the Requests interface was found matching the route defined in the request handler'
        );
      }
      return name;
    } catch (e) {
      console.error(e);
      throw new Error(
        'Failed to find the route in your Requests interface matching the route of the request handler, did you fail to name your requests interface "Requests"?'
      );
    }
  }
}
