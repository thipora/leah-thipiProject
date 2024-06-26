import express from "express";
import Controller from '../controllers/controller.js'
const todoRouter = express.Router();

const controller = new Controller()
todoRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "get", "todos"));
todoRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "todos"));
todoRouter.delete("/", (req, res, next) => controller.handleRequest(req, res, next, "delete", "todos"));
todoRouter.patch("/", (req, res, next) => controller.handleRequest(req, res, next, "update", "todos"));

export{
    todoRouter
}