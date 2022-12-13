import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idrela,
  fecrel,
  nifcon,
  nomcon
FROM relaciones
`
const insertSql = `BEGIN FRAUDE_PKG.INSERTRELACION(
  :idfrau,
  TO_DATE(:fecrel, 'YYYY-MM-DD'),
  :nifcon,
  :nomcon,
  :usumov,
  :tipmov,
  :idrela
); END;
`
const updateSql = `BEGIN FRAUDE_PKG.UPDATERELACION(
  :idrela,
  TO_DATE(:fecrel, 'YYYY-MM-DD'),
  :nifcon,
  :nomcon,
  :usumov,
  :tipmov
); END;
`
const deleteSql = `BEGIN FRAUDE_PKG.DELETERELACION(
  :idrela,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.IDRELA) {
    binds.idrela = context.IDRELA
    query += `WHERE idrela = :idrela`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}

export const insert = async (bind) => {
  bind.idrela = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idrela = await result.outBinds.idrela
  } catch (error) {
    bind = null
  }

  return bind
}
export const update = async (bind) => {
  let result

  try {
    await simpleExecute(updateSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const remove = async (bind) => {
  let result

  try {
    await simpleExecute(deleteSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
