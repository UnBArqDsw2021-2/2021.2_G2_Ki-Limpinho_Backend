
const Service = require("./service.model");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const apiService = {
  /**
   * Get service by Id
   * @returns {Service}
   */
  async get(req, res, next) {
    const _serviceId = req.params.serviceId;

    try {
      const result = await Service.get(_serviceId);
      if (!result) {
        throw new APIError("Não foi encontrado nenhum serviço.", httpStatus.NOT_FOUND);
      }
      res.status(httpStatus.OK).json(result);
    } catch (err) {
      next(new APIError(err.message, httpStatus.BAD_REQUEST));
    }
  },

  /**
   * Create new service
   * @property {string} req.body.brand - The brand of service.
   * @property {string} req.body.licensePlate - The license plate of service.
   * @property {string} req.body.model - The model of service.
   * @property {string} req.body.userId - The userId of service.
   * @property {string} req.body.color - The color of service.
   * @property {string} req.body.status - The status of service.
   * @property {Boolean} req.body.polishing - If the service has polishing
   * @property {Boolean} req.body.cleaning - If the service has cleaning
   * @property {Boolean} req.body.flavoring - If the service has flavoring
   * @returns {Service}
   */
  async create(req, res, next) {
    const { brand, userId, model, licensePlate,  color , status, polishing, cleaning, flavoring} = req.body;

    const service = new Service({
      brand: brand,
      model: model,
      licensePlate: licensePlate,
      color: color,
      status: status,
      polishing: polishing,
      cleaning: cleaning,
      flavoring: flavoring,
      userId: userId,
    });
    try {
      const result = await service.save();
      res.status(httpStatus.CREATED).json(result);
    } catch (error) {
      next(new APIError(error.message, httpStatus.BAD_REQUEST));
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

    if(req.query.campos && typeof(req.query.campos) === 'string') campos.push(req.query.campos)
    else if(req.query.campos) campos = req.query.campos;

    try {
      result = await Service.list({ pagina, tamanhoPagina, filtros, campos });
    } catch (error) {
      next(error);
    }

    res.setHeader("X-Total-Count", result.count);
    res.status(httpStatus.OK).json(result.services);
  },

  /**
   * Get services by user id
   * @property {string} req.params.userId - The user id.
   * @returns {Service}
   */
  async getServicesByUserId(req, res, next) {
    const _userId = req.params.userId;
    try {
      let result = await Service.getServicesByUserId(_userId);
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

