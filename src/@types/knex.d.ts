// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      fullName: string
      email: string
      password: string
      level: string,
      created_at: string,
      updated_at: string      
    }
  }
}
