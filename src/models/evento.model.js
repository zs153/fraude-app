import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  ideven,
  TO_CHAR(feceve, 'YYYY-MM-DD') "FECFRA",
  tipeve,
  obseve,
  TO_CHAR(feceve, 'DD/MM/YYYY') "STRFEC"
FROM eventos
`
const largeQuery = `SELECT 
  tt.destip,
  ee.*,
  TO_CHAR(ff.feceve, 'DD/MM/YYYY') "STRFEC"
FROM eventos ee
INNER JOIN tipos tt ON tt.idtipo = ee.tipeve
`
const insertSql = `BEGIN FRAUDE_PKG.INSERTEVENTO(
  TO_DATE(:feceve, 'YYYY-MM-DD'),
  :tipeve,
  :obseve,
  :usumov,
  :tipmov,
  :ideven
); END;
`
const updateSql = `BEGIN FRAUDE_PKG.UPDATEEVENTO(
  :ideven,
  :tipeve, 
  :obseve,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FRAUDE_PKG.DELETEEVENTO(
  :ideven,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.ideven) {
    binds.ideven = context.ideven
    query += `WHERE ideven = :ideven`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = largeQuery

  const result = await simpleExecute(query)

  return result.rows
}

export const insert = async (bind) => {
  bind.ideven = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.ideven = await result.outBinds.ideven
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
