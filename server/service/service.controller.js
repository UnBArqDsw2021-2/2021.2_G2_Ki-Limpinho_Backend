
const Service = require("./service.model");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const config = require("../../config/config");

const ObjectId = mongoose.Types.ObjectId;

const apiService = {

   /**
   * Load service and append to req.
   */
  load(req, res, next, id) {
    Service.get(id)
      .then((service) => {
        req.service = service; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch(e => next(e));
  },
  /**
   * Get service
   * @returns {Service}
   */
  async get(req, res, next) {
    const _idService = req.params.serviceId;

    try {
      const result = await Service.get(_idService);
      if (!result) {
        throw new APIError("No service found", httpStatus.NOT_FOUND);
      }
      res.status(httpStatus.OK).json(result);
    } catch (err) {
      next(new APIError(err.message, httpStatus.NOT_FOUND));
    }
  },

  /**
   * Create new service
   * @property {string} req.body.marca - The marca of service.
   * @property {string} req.body.placa - The placa of service.
   * @property {string} req.body.modelo - The modelo of service.
   * @property {string} req.body.UserId - The user of service.
   * @property {string} req.body.cor - The cor of service.
   * @property {string} req.body.Status - The Status of service.
   * @property {Boolean} req.body.Polimento - The type of service.
   * @property {Boolean} req.body.Limpeza - The type of service.
   * @property {Boolean} req.body.Cheirinho - The type of service.
   * @returns {Service}
   */
  async create(req, res, next) {
    const { marca, UserId, modelo, placa,  cor , Status, Polimento, Limpeza, Cheirinho} = req.body;
    const service = new Service({
      marca: marca,
      modelo: modelo,
      placa: placa,
      cor: cor,
      Status: Status,
      Limpeza: Limpeza,
      Cheirinho: Cheirinho,
      Polimento: Polimento,
      UserId: ObjectId(UserId),
    });
    try {
      const result = await service.save();
      res.status(httpStatus.CREATED).json(result);
    } catch (error) {
      next(new APIError(error.message, httpStatus.NOT_FOUND));
    }
  },


  async listServices(req, res, next) {
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
            "Filtro mal formatado, esperado um json",
            httpStatus.BAD_REQUEST,
            true
          )
        );
      }
    }

    if (req.query.campos) {
      campos = req.query.campos.split(",");
    }

    try {
      result = await Service.list({ pagina, tamanhoPagina, filtros, campos });
    } catch (error) {
      next(error);
    }

    res.setHeader("X-Total-Count", result.count);
    res.status(httpStatus.OK).json(result.services);
  },
  /**
   * Get by service
   * param {string} req.params.serviceId - The service id.
   * @returns {Service}
   */
  /**
   * Get by user
   * @property {string} req.params.userId - The user id.
   * @returns {Service}
   */
  async getByUser(req, res, next) {
    const _idUser = req.params.userID;
    let result = {};
    try {
      result = await Service.getByUser(_idUser);
      res.status(httpStatus.OK).json(result);
    } catch (error) {
      next(new APIError(error.message));
    }
  },


  /**
   * Delete feedback.
   * @returns {Feedback}
   */
  async remove(req, res, next) {
    const _idService = req.params.serviceId;
    try {
      const service = await Service.get(_idService);
      if (!service) {
        throw new APIError("No service found", httpStatus.NOT_FOUND);
      }
      service
        .remove()
        .then((deletedService) =>
          res.status(httpStatus.OK).json(deletedService)
        )
        .catch((err) =>
          next(new APIError(err.message, httpStatus.expectationFailed))
        );
    } catch (err) {
      next(new APIError(err.message, httpStatus.NO_CONTENT));
    }
  },
};

module.exports = apiService;

