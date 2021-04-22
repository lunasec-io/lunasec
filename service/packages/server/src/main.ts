import serverlessExpress from '@vendia/serverless-express';
import app from './app';
import {APIGatewayProxyEvent, Callback, Context} from "aws-lambda";

exports.handler = (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
    // TODO: this is a hack since serverless-express only uses multiValueQueryStringParameters
    // TODO: we should submit a PR to fix this: https://github.com/vendia/serverless-express/blob/4b5ca7a5e90c7709b25b8fada30e13a76ed5c651/src/event-sources/utils.js#L5
    const queryStringParams = event.queryStringParameters ? event.queryStringParameters : {};
    const multiValueParams = event.multiValueQueryStringParameters ? event.multiValueQueryStringParameters : {};

    Object.keys(queryStringParams).forEach((key) => {
        // @ts-ignore
        multiValueParams[key] = queryStringParams[key];
    });

    event.queryStringParameters = queryStringParams;
    event.multiValueQueryStringParameters = multiValueParams;

    const handler = serverlessExpress({app});
    return handler(event, context, callback);
};
