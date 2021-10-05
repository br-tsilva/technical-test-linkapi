import { IResponse, ResponseStatus } from '@src/adapters'

const httpHelper = {
  response: {
    success: (
      content?: unknown | unknown[],
      status?: number,
      message?: string,
    ): IResponse => ({
      success: true,
      status: ResponseStatus.SUCCESS,
      statusCode: status ?? 200,
      data: content ?? null,
      message: message ?? null,
    }),
    error: (message: string, status?: number): IResponse => ({
      success: false,
      status: ResponseStatus.ERROR,
      statusCode: status ?? 400,
      data: null,
      message,
    }),
  },
}

export { httpHelper }
