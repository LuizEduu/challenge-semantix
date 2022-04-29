class InvalidRequestError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidRequestError'
    Error.captureStackTrace(this, InvalidRequestError)
  }
}

export { InvalidRequestError }
