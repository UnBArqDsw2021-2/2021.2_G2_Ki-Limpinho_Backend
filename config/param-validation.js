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
    params: Joi.object({
      userId: Joi.string().hex().required(),
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
};
