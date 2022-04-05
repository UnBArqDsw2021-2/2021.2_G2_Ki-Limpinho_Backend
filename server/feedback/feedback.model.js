const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const ObjectId = mongoose.Types.ObjectId;
/**
 * Feedback Schema
 */
const FeedbackSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  ratingBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
FeedbackSchema.pre("save", function (next) {
  now = new Date();
  this.updateAt = now;
  if (!this.createAt) {
    this.createAt = now;
  }
  next();
});

FeedbackSchema.pre("findOneAndUpdate", function (next) {
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
FeedbackSchema.statics = {
  /**
   * Get Feedback
   * @param {ObjectId} id - The objectId of feedback.
   * @returns {Promise<Feedback, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((feedback) => {
        if (feedback) {
          return feedback;
        }
        const err = new APIError(
          "No such feedback exists!",
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },



  /**
   * Get all feedbacks by service
   * @param {ObjectId} idService - The objectId of service.
   * @returns {Promise<Feedback, APIError>}
   */
  getByService(id) {
    return this.find({ service: id })
      .exec()
      .then((feedback) => {
        if (feedback) {
          return feedback;
        }
        const err = new APIError(
          "No such feedback exists!",
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },
  /**
   * Get rating by service
   * @param {ObjectId} idService - The objectId of service.
   * @returns {Promise<Feedback, APIError>}
   */
  getRatingByService(idService) {
    return this.aggregate([
      {
        '$match': {
          'service': ObjectId(idService)
        }
      }, {
        '$group': {
          '_id': '$service', 
          'media': {
            '$avg': '$rating'
          }
        }
      }
    ]).allowDiskUse(true)
      .exec()
      .then((rating) => {
        if (rating) {
          return rating;
        }
        const err = new APIError(
          "No such rating for this service!",
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      }
    );
  },

  /**
   * Get feeack by user
   * @param {ObjectId} idUser - The objectId of user.
   * @returns {Promise<Feedback, APIError>}
   */
  getByUser(idUser) {
    return this.find({ ratingBy: idUser })
      .exec()
      .then((feedback) => {
        if (feedback) {
          return feedback;
        }
        const err = new APIError(
          "No such feedback exists!",
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },

  /**
   * List feedbacks in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of feedbacks to be skipped.
   * @param {number} limit - Limit number of feedbacks to be returned.
   * @returns {Promise<Feedback[]>}
   */
  /**
   * Lista feedbacks
   * @param {number} pagina - Numero da pagina atual.
   * @param {number} tamanhoPagina - Numero de patentes por pagina.
   * @param {*} filtros - JSON no formato de um filtro de projecao.
   * @param {Array} campos - Campos que devem ser projetados.
   * @returns {Promise<feedbacks[]>}
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
      const feedbacks = await this.find(mongoQuery, mongoProjection)
        .skip(pagina * tamanhoPagina)
        .limit(+tamanhoPagina ? +tamanhoPagina : limit)
        .exec();
      return { feedbacks, count };
    } catch (error) {
      throw error;
    }
  },

  async updateFeedback({ idFeedback, updates } = {}) {
    const _idFeedback = new ObjectId(idFeedback);
    const updateQuery = {};

    // updates: [
    //   {
    //     chave: "rating",
    //     valor: 5,
    //   },
    //   {
    //     chave: "comment",
    //     valor: "Gostei da qualidade do produto utilizado",
    //   }
    // ]

    updates.updates.forEach((update) => {
      updateQuery[update.chave] = update.valor;
    });
    updateQuery["updatedAt"] = new Date();
    try {
      const result = await this.findOneAndUpdate(
        { _id: _idFeedback },
        { $set: updateQuery },
        { new: true }
      ).exec();
      if (!result)
        throw new APIError(
          "Não existe Feedbacks com esse identificador",
          httpStatus.NOT_FOUND
        );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @typedef Feedback
 */
module.exports = mongoose.model("Feedback", FeedbackSchema);
