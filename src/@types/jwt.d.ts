declare global {
  export interface JwtPayload {
    id: string
    email: string
    level: string
    userId: string
  }
}
