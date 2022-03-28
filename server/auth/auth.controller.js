const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const config = require("../../config/config");
const User = require("../user/user.model");

const apiAuth = {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  async login(req, res, next) {
    const userRequest = req.body;
    try {
      const user = await User.find({ email: userRequest.email });

      if (userRequest.senha === user.senha) {
        const token = jwt.sign(
          {
            email: user.email,
          },
          config.jwtSecret
        );
        return res.json({
          token,
          user: user[0],
        });
      }
      const err = new APIError(
        "Senha incorreta.",
        httpStatus.UNAUTHORIZED,
        true
      );
      return next(err);
    } catch (error) {
      const err = new APIError(
        "Email não encontrado.",
        httpStatus.NOT_FOUND,
        true
      );
      return next(err);
    }
  },

  isAdmin(req, res, next) {
    const email = req.body.email;
    return res.json({
      isAdmin: email === config.email
    });
  }
};

module.exports = apiAuth;
