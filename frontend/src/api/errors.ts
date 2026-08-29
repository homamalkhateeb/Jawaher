export class APIError extends Error {
  status: number
  code?: string

  constructor(
    message: string,
    status: number,
    code?: string
  ) {
    super(message)

    this.name = 'APIError'
    this.status = status
    this.code = code
  }
}