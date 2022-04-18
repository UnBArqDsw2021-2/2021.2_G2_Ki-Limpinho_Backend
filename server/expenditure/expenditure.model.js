const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const ObjectId = mongoose.Types.ObjectId;
/**
 * Expenditure Schema
 * @private
 * @type {mongoose.Schema}
 * @property {Number} amount - The amount of money spent.
 * @property {Date} date - The date of the expenditure.
 * @property {Boolean} isFixed - Whether the expenditure is fixed or not.
 * @property {String} description - The description of the expenditure.
 * @property {String} title - The title of the expenditure.
 * @property {Date} createdAt - The date of creation.
 * @property {Date} updatedAt - The date of last update.
**/
const ExpenditureSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    get: v => Math.round(v * 100) / 100,
    set: v => Math.round(v * 100) / 100
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isFixed: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
},
{
  toJSON: { getters: true }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

ExpenditureSchema.pre("save", function (next) {
  now = new Date();
  // this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
}
);

// ExpenditureSchema.pre("findOneAndUpdate", function (next) {
//   now = new Date();
//   this.updatedAt = now;
//   next();
// }
// );
/**
 * Methods
 */


/**
 * Statics
 */
// Eu, como gerente do sistema desejo listar despesas fixas e variáveis(mês), para ter controle sobre lucro líquido e o fluxo de caixa.
ExpenditureSchema.statics = {

  /**
   * List expenditures
   * @param {number} pagina - Number of expenditures to be skipped.
   * @param {number} tamanhoPagina - Limit number of expenditures to be returned.
   * @param {*} [filtros] - Filter to be applied.
   * @param {Array} campos - Fields to be returned.
   * @returns {Promise<Expenditure[]>}
   */


  async list({
    pagina = 0,
    tamanhoPagina = 20,
    filtros = {},
    campos = []
  } = {}) {
    const mongoQuery = {};
    let mongoProjection = {};

    if (filtros !== {} && typeof filtros === 'object') {
      Object.keys(filtros).forEach((keyFiltro) => {
        mongoQuery[keyFiltro] = filtros[keyFiltro];
      });
    }
    if(filtros.date){
      const date = new Date(filtros.date);
      if(isNaN(date)){
        throw new APIError("Formato de data inválido");
      }
      const month = date.getMonth();
      const year = date.getFullYear();
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      mongoQuery.date = {};
      mongoQuery.date.$gte = start;
      mongoQuery.date.$lte = end;
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

      const expenditures = await this
        .find(mongoQuery, mongoProjection)
        .sort({ date: -1 })
        .skip(pagina * tamanhoPagina)
        .limit(+tamanhoPagina ? +tamanhoPagina : limit)
        .exec();
      return { expenditures, count };
    } catch (error) {
      throw error;
    }
  },
}

/**
 * @typedef Feedback
 */

module.exports = mongoose.model("Expenditure", ExpenditureSchema);