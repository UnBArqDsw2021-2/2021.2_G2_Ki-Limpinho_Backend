const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const ObjectId = mongoose.Types.ObjectId;
/**
 * User Schema
 */
const ServiceSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true
  },

  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  modelo: {
    type: String,
    required: true,
  },

  placa: {
    type: String,
    required: true
  },

  cor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  Status: {
    type: String,
    default: "Aguardando"
  },

  Polimento : {
    type: Boolean,
    default: false
  },

  Limpeza : {
    type: Boolean,
    default: false
  },

  Cheirinho : {
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

ServiceSchema.pre("findOneAndUpdate", function (next) {
  now = new Date();
  this.updateAt = now;
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
   * @param {ObjectId} id - The objectId of service.
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
   * Get all service by user
   * @param {ObjectId} idUser - The objectId of service.
   * @returns {Promise<Service, APIError>}
   */


  getByUser(idUser) {
    return this.find({ UserId: idUser })
      .exec()
      .then((service) => {
        if (service) {
          return service;
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
