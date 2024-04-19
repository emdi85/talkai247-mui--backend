// add, show, edit, delete
import express from 'express'
import phoneRouter from './apiRouters/phoneRouter.js'

const router = express.Router()

router.use('/phone', phoneRouter)

export default router
