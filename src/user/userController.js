const userServiceInstance = require("./userServiceInstance");
const buildResponse = require("../util/response/buildResponse");

const userController = {
  async postSignup(req, res, next) {
    try {
      const user = req.body;
      await userServiceInstance.signup(user);
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },

  async postUpdateProfile(req, res, next) {
    try {
      const { nickName, intro } = req.body;
      const user = req.user;
      await userServiceInstance.changeProfile(user, nickName, intro);
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;