// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      fullName: string
      email: string
      password: string
      level: string
      created_at: string
      updated_at: string
    }
    meals: {
      name: string,
      id: string
      description: string
      is_in_diet: boolean
      time: string
      user_id: string
      created_at: string
      updated_at: string
    }
  }
}
