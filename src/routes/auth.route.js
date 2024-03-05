import express from 'express'
const router = express.Router()
import * as authController from '../controllers/auth.controller.js'
import * as globalMiddleware from '../middlewares/global.middleware.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

router.get ("/criar/conta", authController.showRegisterForm)

router.post("/criar/conta", globalMiddleware.validateUserFields ,authController.registerUser)

router.get("/login", authController.showRegisterLogin)

router.post("/login/user" , authMiddleware.validateLoginFields, authController.login)

export default router