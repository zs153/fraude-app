import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  ss.*,
  TO_CHAR(ss.fecsms, 'DD/MM/YYYY') "STRFEC"
FROM smss ss
`
const insertSql = `BEGIN FRAUDE_PKG.INSERTSMS(
  TO_DATE(:fecsms, 'YYYY-MM-DD'),
  :texsms, 
  :movsms, 
  :stasms, 
  :usumov,
  :tipmov,
  :idsmss
); END;
`
const updateSql = `BEGIN FRAUDE_PKG.UPDATESMS(
  :idsmss,
  TO_DATE(:fecsms, 'YYYY-MM-DD'),
  :texsms, 
  :movsms,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FRAUDE_PKG.DELETESMS(
  :idsmss,
  :usumov,
  :tipmov 
); END;
`
const cambioSql = `BEGIN FRAUDE_PKG.CAMBIOESTADOSMS(
  :idsmss,
  :stasms,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.IDSMSS) {
    binds.idsmss = context.IDSMSS
    query += `WHERE ss.idsmss = :idsmss`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insert = async (bind) => {
  bind.idsmss = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idsmss = await result.outBinds.idsmss
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
export const change = async (bind) => {
  let result

  try {
    await simpleExecute(cambioSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
