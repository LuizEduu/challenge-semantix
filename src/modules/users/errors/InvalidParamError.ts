class InvalidParamError extends Error {
  public readonly statusCode: number

  constructor (message: string, statusCode = 400) {
    super(message)
    this.name = 'InvalidParamError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, InvalidParamError)
  }
}

export { InvalidParamError }
