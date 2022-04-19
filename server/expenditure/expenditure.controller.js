const Expenditure = require("./expenditure.model");
const APIError = require("../helpers/APIError");
const mongoose = require("mongoose");
const httpStatus = require("http-status");

const ObjectId = mongoose.Types.ObjectId;

const apiExpenditure = {

  /**
   * Create a new expenditure
   * @property {string} req.body.amount - The amount of money spent.
   * @property {string} req.body.date - The date of the expenditure.
   * @property {string} req.body.description - The description of the expenditure.
   * @property {string} req.body.isFixed - Whether the expenditure is fixed or not.
   * @property {string} req.body.title - The title of the expenditure.
   * @returns {Expenditure}
   *
   */
  async create(req, res, next)  {
    try {
      const expenditure = new Expenditure(req.body);
      await expenditure.save();
      return res.status(httpStatus.CREATED).json(expenditure);
    } catch (err) {
      return next(new APIError(err.message, httpStatus.BAD_REQUEST));
    }
  },

  async listExpenditures(req, res, next) {
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
        return next(
          new APIError(
            'Filtro mal formatado, esperado um json',
            httpStatus.BAD_REQUEST,
            true
          )
        );
      }
    }

    if(req.query.campos && typeof(req.query.campos) === 'string') campos.push(req.query.campos)
    else if(req.query.campos) campos = req.query.campos;

    try {
      result = await Expenditure.list({ pagina, tamanhoPagina, filtros, campos });
    } catch (error) {
      return next(error);
    }

    res.setHeader('X-Total-Count', result.count);
    res.status(httpStatus.OK).json(result.expenditures);
  },
};

module.exports = apiExpenditure;

