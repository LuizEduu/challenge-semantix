import { GetUsersController } from '@/modules/users/useCases/getUsersUseCase/GetUsersController'
import { Router } from 'express'

const usersRouter = Router()

const getUsersController = new GetUsersController()

usersRouter.get('/', getUsersController.handle)

export { usersRouter }
