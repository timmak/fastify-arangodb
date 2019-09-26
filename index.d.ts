import { Config, Database } from "arangojs";
import { Plugin } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

declare namespace fastifyArangoDB {
  interface FastifyArangoDBOptions {
    database?: string;
    auth?: {
      username: string;
      password: string;
    };
    options?: Config;
  }
}

declare module "fastify" {
  interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    arango: Database;
  }
}

declare const fastifyArangoDB: Plugin<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyArangoDBOptions
>;

export = fastifyArangoDB;
