const User = require('./user.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


const apiUser = {
  /**
   * Load user and append to req.
   */
  load(req, res, next, id) {
    User.get(id)
      .then((user) => {
        req.user = user; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch(e => next(e));
  },

  /**
   * Get user
   * @returns {User}
   */
  get(req, res) {
    return res.json(req.user);
  },

  /**
   * Create new user
   * @property {string} req.body.username - The username of user.
   * @property {string} req.body.mobileNumber - The mobileNumber of user.
   * @returns {User}
   */
   async create(req, res, next) {
    const { name, email, cpf, password } = req.body;
    const user = new User({
      name: name,
      email: email,
      cpf: cpf,
      password: password,
    });
    try {
      const result = await user.save();
      result.password = undefined;
      res.status(httpStatus.CREATED).json(result);
    } catch (error) {
      next(new APIError(error.message, httpStatus.BAD_REQUEST));
    }
  },

  async update(req, res, next) {
    const _idUser = req.user.idUser;
    const updateFields = req.body;

      try {
        const status = await User.updateUser({ idUser: _idUser, updates: updateFields });
        res.status(httpStatus.OK).json(status);
      } catch (error) {
        next(new APIError(error.message));
      }
  },

  async listUsers(req, res, next) {
    let filtros = {};
    let result = {};
    let campos = [];

    const pagina = parseInt(req.query.pagina || 0, 10);
    const tamanhoPagina = Math.min(
      parseInt(req.query.tamanhoPagina || 20, 10),
      100
    );

    if (req.query.filtros) {
      try {
        filtros = JSON.parse(req.query.filtros);
      } catch (error) {
        next(
          new APIError(
            'Filtro mal formatado, esperado um json',
            httpStatus.BAD_REQUEST,
            true
          )
        );
      }
    }

    if (req.query.campos) {
      campos = req.query.campos.split(',');
    }

    try {
      result = await User.list({ pagina, tamanhoPagina, filtros, campos });
    } catch (error) {
      next(error);
    }

    res.setHeader('X-Total-Count', result.count);
    res.status(httpStatus.OK).json(result.users);
  },

  /**
   * Delete user.
   * @returns {User}
   */
  remove(req, res, next) {
    const user = req.user;
    user.remove()
      .then(deletedUser => res.json(deletedUser))
      .catch(e => next(e));
  },
};


module.exports = apiUser;
