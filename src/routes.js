const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login de ongs ja existentes
routes.post('/sessions', sessionController.create);

//Cadastro de novas ongs, COM VALIDAÇÃO
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);

//Listagem das ongs cadastradas
routes.get('/ongs', ongController.index);

//Listagem dos casos especificos de uma ong, COM VALIDAÇÃO
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), profileController.index);

//Cadastro de um novo caso
routes.post('/incidents', incidentController.create);

//Lista de todos os casos, COM VALIDAÇÃO
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.index);

//Deletar de um caso, COM VALIDAÇÃO
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete);

module.exports = routes;