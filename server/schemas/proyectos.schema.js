const Joi = require("joi")

const id = Joi.string().uuid()
const name = Joi.string()
fecha_inicio = Joi.date()
fecha_fin = Joi.date()

const createProjectsSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  fecha_inicio: fecha_inicio.required(),
  fecha_fin: fecha_fin.required(),
})

module.exports = {createProjectsSchema}
