const apiRoute = require("./v1");

const routes = require("express").Router();

routes.use(apiRoute)
module.exports = routes