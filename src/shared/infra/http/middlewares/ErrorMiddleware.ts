import { Request, Response, NextFunction } from 'express'

import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'

export default function errorMiddleware (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (error instanceof InvalidRequestError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  return response.status(500).json({
    status: 'Error',
    message: `internal server error - ${error.message}`
  })
}
