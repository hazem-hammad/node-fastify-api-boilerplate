import UserController from "app/users/controllers/users.controller";
import router from "core/router";

const userController = new UserController();

router.get("/users", userController.index);

router.get("/users/:id", userController.show);

router.post("/users", userController.store);
