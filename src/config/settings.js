import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT
export const dbPool = {
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
  poolMin: 10,
  poolMax: 10,
  poolIncrement: 0,
}
export const maxRows = 50000
export const batchSize = 1000
