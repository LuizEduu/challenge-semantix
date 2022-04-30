class InvalidRequestError extends Error {
  public readonly statusCode: number

  constructor (message: string, statusCode = 400) {
    super(message)
    this.name = 'InvalidRequestError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, InvalidRequestError)
  }
}

export { InvalidRequestError }
