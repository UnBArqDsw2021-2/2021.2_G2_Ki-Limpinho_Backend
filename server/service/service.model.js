const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const ObjectId = mongoose.Types.ObjectId;
/**
 * User Schema
 */
const ServiceSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  model: {
    type: String,
    required: true,
  },

  licensePlate: {
    type: String,
    required: true
  },

  color: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    default: "Aguardando"
  },

  polishing : {
    type: Boolean,
    default: false
  },

  cleaning : {
    type: Boolean,
    default: false
  },

  flavoring: {
    type: Boolean,
    default: false
  },

});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

 ServiceSchema.pre("save", function (next) {
  now = new Date();
  this.updateAt = now;
  if (!this.createAt) {
    this.createAt = now;
  }
  next();
});

/**
 * Methods
 */

/**
 * Statics
 */

 ServiceSchema.statics = {
  /**
   * Get service
   * @param {ObjectId} id - Service objectId.
   * @returns {Promise<Service, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((service) => {
        if (service) {
          return service;
        }
        const err = new APIError('No such user exists!',
         httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },

  /**
   * Get services by user
   * @param {ObjectId} userId - User objectId.
   * @returns {Promise<Service, APIError>}
   */
  getServicesByUserId(userId) {
    return this.find({ userId })
      .exec()
      .then((services) => {
        if (services) {
          return services;
        }
        const err = new APIError(
          "No such service exists!",
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },

  /**
   * List services in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of services to be skipped.
   * @param {number} limit - Limit number of services to be returned.
   * @returns {Promise<Service[]>}
   */
  /**
   * Lista services
   * @param {number} pagina - Numero da pagina atual.
   * @param {number} tamanhoPagina - Numero de patentes por pagina.
   * @param {*} filtros - JSON no formato de um filtro de projeção.
   * @param {Array} campos - Campos que devem ser projetados.
   * @returns {Promise<services[]>}
   */
  async list({
    pagina = 0,
    tamanhoPagina = 20,
    filtros = {},
    campos = [],
  } = {}) {
    const mongoQuery = {};
    let mongoProjection = {};

    if (filtros !== {} && typeof filtros === "object") {
      Object.keys(filtros).forEach((keyFiltro) => {
        mongoQuery[keyFiltro] = filtros[keyFiltro];
      });
    }

    if (Array.isArray(campos) && campos.length > 0) {
      mongoProjection = {};
      campos.forEach((field) => {
        mongoProjection[field] = 1;
      });
    }

    try {
      const count = await this.find(mongoQuery).count().exec();
      let limit = count;
      if (!limit) {
        limit = 1;
      }
      const services = await this.find(mongoQuery, mongoProjection)
        .skip(pagina * tamanhoPagina)
        .limit(+tamanhoPagina ? +tamanhoPagina : limit)
        .exec();
      return { services, count };
    } catch (error) {
      throw error;
    }
  },

};

/**
 * @typedef Service
 */
module.exports = mongoose.model("Service", ServiceSchema);
