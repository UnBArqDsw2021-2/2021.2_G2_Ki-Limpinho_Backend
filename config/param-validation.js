const Joi = require("joi");

module.exports = {
  // POST /api/users
  createUser: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      cpf: Joi.string().required(),
      password: Joi.string().required(),
    }).options({ abortEarly: false }),
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: Joi.object()
      .keys({
        updates: Joi.array().items({
          chave: Joi.string().valid("name", "cpf", "email", "password"),
          valor: Joi.any(),
        }),
      })
      .options({ abortEarly: false }),
  },

  // GET /api/user
  listUsers: {
    query: Joi.object({
      pagina: Joi.number().min(0),
      tamanhoPagina: Joi.number().min(1).max(100),
      filtros: Joi.string(),
      campos: Joi.alternatives().try(Joi.array().items(Joi.string().valid("name", "cpf", "email", "createdAt")) , Joi.string().valid("name", "cpf", "email", "createdAt"))
    }).options({ abortEarly: false }),
  },

  // POST /api/auth/login
  login: {
    body: Joi.object({
       email: Joi.string().required(),
       password: Joi.string().required()
    }).options({ abortEarly: false }),
  },

  // POST /api/feedback
  createFeedback: {
    body: Joi.object({
      comment: Joi.string(),
      rating: Joi.number().min(1).max(5).required(),
      service: Joi.string().required(),
      ratingBy: Joi.string().required(),
    }).options({ abortEarly: false }),
  },
  // PATCH /api/feedback/:feedbackId
  updateFeedback: {
    body: Joi.object()
      .keys({
        updates: Joi.array().items({
          chave: Joi.string().valid("comment", "rating"),
          valor: Joi.any(),
        }),
      })
      .options({ abortEarly: false }),
    params: Joi.object({
      feedbackId: Joi.string().hex().required(),
    }).options({ abortEarly: false }),
  },

  // POST /api/expenditure
  createExpenditure: {
    body: Joi.object({
      amount: Joi.number().required(),
      date: Joi.date().required(),
      description: Joi.string().required(),
      title: Joi.string().required(),
      isFixed: Joi.boolean().required(),
    }).options({ abortEarly: false }),
  },

  // GET /api/expenditure
  listExpenditures: {
    query: Joi.object({
      pagina: Joi.number().min(0),
      tamanhoPagina: Joi.number().min(1).max(100),
      filtros: Joi.string(),
      campos: Joi.alternatives().try(Joi.array().items(Joi.string().valid("amount", "date", "description", "title", "isFixed", "createdAt")) , Joi.string().valid("amount", "date", "description", "title", "isFixed", "createdAt"))
    }).options({ abortEarly: false }),
  },

  // POST /api/service
  createService: {
    body: Joi.object({
      brand: Joi.string().required(),
      model: Joi.string().required(),
      licensePlate: Joi.string().required(),
      color: Joi.string(),
      status: Joi.string(),
      cleaning: Joi.boolean(),
      flavoring: Joi.boolean(),
      polishing: Joi.boolean(),
      userId: Joi.string().hex().required(),
    }).options({ abortEarly: false }),
  },

  // GET /api/service
  listServices: {
    query: Joi.object({
      pagina: Joi.number().min(0),
      tamanhoPagina: Joi.number().min(1).max(100),
      filtros: Joi.string(),
      campos: Joi.alternatives().try(Joi.array().items(Joi.string().valid("brand", "model", "color", "userId", "flavoring", "licensePlate", "polishing", "cleaning", "status", "createdAt")) , Joi.string().valid("brand", "model", "color", "userId", "flavoring", "licensePlate", "polishing", "cleaning", "status", "createdAt"))
    }).options({ abortEarly: false }),
  },
};
