import { Router } from 'express'
import { usersRouter } from './Users.route'

const router = Router()

router.use('/users', usersRouter)

export { router }
