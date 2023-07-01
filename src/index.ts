import "app/routes.provider";
import startApplication from "core/application";
import router from "core/router";

router.get("/", (request: any, response: any) => {
  response.send({ hello: "world" });
});

startApplication();
