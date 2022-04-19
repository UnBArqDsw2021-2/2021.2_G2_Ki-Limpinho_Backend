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

  // POST /api/feedbacks
  createFeedback: {
    body: Joi.object({
      comment: Joi.string(),
      rating: Joi.number().min(1).max(5).required(),
      service: Joi.string().required(),
      ratingBy: Joi.string().required(),
    }).options({ abortEarly: false }),
  },
  // PATCH /api/feedbacks/:feedbackId
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

  // POST /api/expenditures
  createExpenditure: {
    body: Joi.object({
      amount: Joi.number().required(),
      date: Joi.date().required(),
      description: Joi.string().required(),
      title: Joi.string().required(),
      isFixed: Joi.boolean().required(),
    }).options({ abortEarly: false }),
  },

  // GET /api/expenditures
  listExpenditures: {
    query: Joi.object({
      pagina: Joi.number().min(0),
      tamanhoPagina: Joi.number().min(1).max(100),
      filtros: Joi.string(),
      campos: Joi.alternatives().try(Joi.array().items(Joi.string().valid("amount", "date", "description", "title", "isFixed", "createdAt")) , Joi.string().valid("amount", "date", "description", "title", "isFixed", "createdAt"))
    }).options({ abortEarly: false }),
  },

    // POST /api/expenditures
    createService: {
      body: Joi.object({
        marca: Joi.string().required(),
        modelo: Joi.string().required(),
        placa: Joi.string().required(),
        cor: Joi.string(),
        Status: Joi.string(),
        Limpeza: Joi.boolean(),
        Cheirinho: Joi.boolean(),
        Polimento: Joi.boolean(),
        UserId: Joi.string().required(),
      }).options({ abortEarly: false }),
    },
};
