export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IResponse {
  success: boolean
  status: ResponseStatus
  statusCode: number
  data: unknown | unknown[] | null
  message: string | null
}
