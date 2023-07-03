import multipart from "@fastify/multipart";
import connection from "core/database/connection";
import router from "core/router";
import Fastify from "fastify";

function connectToDatabase() {
  connection.connect();
}

async function connectToServer() {
  const server = Fastify();

  server.register(multipart, {
    attachFieldsToBody: true,
  });

  /**
   * Register routes
   */
  router.scan(server);

  try {
    // 👇🏻 We can use the url of the server
    const address = await server.listen({ port: 4000 });

    console.log(`Start browsing using ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1); // stop the process, exit with error
  }
}

export default async function startApplication() {
  connectToDatabase();
  connectToServer();
}
