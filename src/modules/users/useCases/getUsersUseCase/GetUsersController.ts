import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUsersUseCase } from './GetUsersUseCase'

class GetUsersController {
  async handle (
    request: Request,
    response: Response
  ): Promise<Response<Response>> {
    const getUsersUseCase = container.resolve(GetUsersUseCase)

    const { page, limit, sortBy, order } = request.query

    const users = await getUsersUseCase.execute(page as string, limit as string, sortBy as string, order as string)

    return response.status(200).json(users)
  }
}

export { GetUsersController }
