const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const config = require("../../config/config");
const User = require("../user/user.model");
const bcrypt = require("bcrypt");

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
      const user = await User.find({ email: userRequest.email }).select(
        "+password"
      );
      savedUser = user.shift();
      if (!savedUser) {
        throw new APIError("Email não encontrado", httpStatus.NOT_FOUND);
      }
      const isPasswordValid = await bcrypt.compare(
        userRequest.password,
        savedUser.password
      );
      if (!isPasswordValid) {
        throw new APIError("Senha incorreta.", httpStatus.UNAUTHORIZED);
      }

      if (isPasswordValid) {
        const token = jwt.sign(
          {
            idUser: savedUser._id,
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
    } catch (error) {
      const err = new APIError(error.message, error.status, true);
      return next(err);
    }
  },

  async ping(req, res, next) {
    const _idUser = req.user.idUser;

    try {
      const user = await User.findOne({
        idUser: _idUser,
      });
      res.status(httpStatus.OK).json(user);
    } catch (error) {
      next(new APIError(error.message));
    }
  },
};

module.exports = apiAuth;
