import { Request, Response, NextFunction } from 'express'
import { IResponse } from '@src/adapters'

const responseHandler = (
  content: IResponse,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  if (response.headersSent) return

  response.status(content.statusCode).json(content)
}

export { responseHandler }
