const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

// module.exports = (app) => {
//   const users = require("../controllers/user.controller");

//   let router = require("express").Router();

//   // Create a new User
//   router.post("/", users.create);

//   // Retrieve all Users
//   router.get("/", users.findAll);

//   app.use("/api/users", router);
// };

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
