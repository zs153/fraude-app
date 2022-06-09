import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
    idofic,
    desofi,
    codofi
  FROM oficinas
`
const insertSql = `BEGIN FRAUDE_PKG.INSERTOFICINA(
    :desofi, 
    :codofi,
    :usumov,
    :tipmov,
    :idofic
  ); END;
`
const updateSql = `BEGIN FRAUDE_PKG.UPDATEOFICINA(
  :idofic,
  :desofi, 
  :codofi,
  :usumov,
  :tipmov
); END;
`
const deleteSql = `BEGIN FRAUDE_PKG.DELETEOFICINA(
    :idofic,
    :usumov,
    :tipmov 
  ); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idofic) {
    binds.idofic = context.idofic
    query += `WHERE idofic = :idofic`
  }
  if (context.codofi) {
    binds.codofi = context.codofi
    query += `WHERE codofi = :codofi`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async () => {
  let query = baseQuery

  query += `ORDER BY desofi`

  const result = await simpleExecute(query)
  return result.rows
}
export const insert = async (bind) => {
  bind.idofic = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idofic = await result.outBinds.idofic
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
