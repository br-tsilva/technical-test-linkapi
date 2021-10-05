export enum PipedriveDealStatus {
  ALL_NOT_DELETED = 'all_not_deleted',
  DELETED = 'deleted',
  LOST = 'lost',
  OPEN = 'open',
  WON = 'won',
}

export interface IPipedriveGetDealsRequest {
  status?: PipedriveDealStatus
}

export interface IPipedriveGetDealsResponse {
  success: boolean
  data: Array<unknown>
  related_objects: Array<unknown>
  additional_data: Array<unknown>
}
