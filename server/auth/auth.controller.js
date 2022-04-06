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
      let savedUser = await User.find({ email: userRequest.email });
      savedUser = savedUser.shift();

      if (userRequest.password === savedUser.password) {
        const token = jwt.sign(
          {
            email: savedUser.email,
          },
          config.jwtSecret
        );
        return res.json({
          token,
          user: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            cpf: savedUser.cpf,
            createdAt: savedUser.createdAt,
            isAdmin: savedUser.email === config.email,
          },
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
        httpStatus.BAD_REQUEST,
        true
      );
      return next(err);
    }
  },
};

module.exports = apiAuth;
