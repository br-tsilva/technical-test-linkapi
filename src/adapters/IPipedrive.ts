export enum PipedriveDealStatus {
  ALL_NOT_DELETED = 'all_not_deleted',
  DELETED = 'deleted',
  LOST = 'lost',
  OPEN = 'open',
  WON = 'won',
}

export interface IPipedriveDealCreator {
  id: number
  name: string
  email: string
  has_pic: number
  pic_hash: string
  active_flag: boolean
  value: number
}

export interface IPipedriveDealPerson {
  active_flag: boolean
  name: string
  email: {
    label: string
    value: string
    primary: boolean
  }[]
  phone: {
    label: string
    value: string
    primary: boolean
  }[]
  owner_id: number
  value: number
}

export interface IPipedriveDealOrganization {
  name: string
  people_count: number
  owner_id: number
  address: string
  active_flag: boolean
  cc_email: string
  value: number
}

export interface IPipedriveGetDealsRequest {
  status?: PipedriveDealStatus
}

export interface IPipedriveResponseDeal {
  id: number
  creator_user_id: IPipedriveDealCreator
  user_id: IPipedriveDealCreator
  person_id: IPipedriveDealPerson
  org_id: IPipedriveDealOrganization
  stage_id: number
  title: string
  value: number
  currency: string
  add_time: string
  update_time: string
  stage_change_time: string
  active: boolean
  deleted: boolean
  status: PipedriveDealStatus
  probability: string
  next_activity_date: string
  next_activity_time: string
  next_activity_id: number
  last_activity_id: number
  last_activity_date: string
  lost_reason: string
  visible_to: string
  close_time: string
  pipeline_id: number
  won_time: string
  first_won_time: string
  lost_time: string
  products_count: number
  files_count: number
  notes_count: number
  followers_count: number
  email_messages_count: number
  activities_count: number
  done_activities_count: number
  undone_activities_count: number
  participants_count: number
  expected_close_date: string
  last_incoming_mail_time: string
  last_outgoing_mail_time: string
  label: string
  renewal_type: string
  stage_order_nr: number
  person_name: string
  org_name: string
  next_activity_subject: string
  next_activity_type: string
  next_activity_duration: string
  next_activity_note: string
  group_id: number
  group_name: string
  formatted_value: string
  weighted_value: number
  formatted_weighted_value: string
  weighted_value_currency: string
  rotten_time: string
  owner_name: string
  cc_email: string
  org_hidden: boolean
  person_hidden: boolean
}

export interface IPipedriveGetDealsResponse {
  success: boolean
  data: Array<IPipedriveResponseDeal>
  related_objects: Array<Record<string, unknown>>
  additional_data: Array<Record<string, unknown>>
  error: string
  error_info: string
}
