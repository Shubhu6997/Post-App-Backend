const route = require("express").Router();
const service = require("../services/comments.service");

route.get("/:id", service.getComments);
route.post("/", service.addComment);
route.delete("/:id", service.deleteComment);

module.exports = route;