import express  from "express";
const router = express.Router()
import * as userController from "../controllers/user.controller.js"
import * as globalMiddleware from "../middlewares/global.middleware.js"
import * as authMiddleware from "../middlewares/auth.middleware.js"


router.get("/", userController.showContacts)

router.get("/cadastrar", authMiddleware.checkToken, userController.showRegisterContactForm)

router.post("/cadastrar/contato", globalMiddleware.validateContactFields , userController.registerContact)

router.get("/editar/:id", userController.showEditForm)

router.post("/editar/contato", globalMiddleware.validateContactFields, userController.editForm)

router.get("/deletar/:id", userController.deleteContact)


export default router