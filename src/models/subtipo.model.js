import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  st.idsubt,
  st.dessub
FROM subtipos st
`
const insertSql = `BEGIN FRAUDE_PKG.INSERTSUBTIPO(
  :dessub,
  :usumov,
  :tipmov,
  :idsubt
); END;
`
const updateSql = `BEGIN FRAUDE_PKG.UPDATESUBTIPO(
  :idsubt,
  :dessub,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FRAUDE_PKG.DELETESUBTIPO(
    :idsubt,
    :usumov,
    :tipmov 
  ); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idsubt) {
    binds.idsubt = context.idsubt
    query += `WHERE st.idsubt = :idsubt`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async () => {
  let query = baseQuery

  const result = await simpleExecute(query)

  return result.rows
}

export const insert = async (bind) => {
  bind.idsubt = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idsubt = await result.outBinds.idsubt
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
    await simpleExecute(removeSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
