import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  ee.*,
  TO_CHAR(ee.feceve, 'DD/MM/YYYY') "STRFEC"
FROM eventos ee
`
const largeQuery = `SELECT 
  te.destip,
  ee.*,
  TO_CHAR(ee.feceve, 'DD/MM/YYYY') "STRFEC"
FROM eventos ee
INNER JOIN eventosfraude ef ON ef.ideven = ee.ideven
INNER JOIN tiposevento te ON te.idtipo = ee.tipeve
WHERE ef.idfrau = :idfrau
`
const insertSql = `BEGIN FRAUDE_PKG.INSERTEVENTOFRAUDE(
  :idfrau,
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
  TO_DATE(:feceve, 'YYYY-MM-DD'),
  :tipeve, 
  :obseve,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FRAUDE_PKG.DELETEEVENTOFRAUDE(
  :idfrau,
  :ideven,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.IDEVEN) {
    binds.ideven = context.IDEVEN
    query += `WHERE ee.ideven = :ideven`
  } else if (context.IDFRAU) {
    binds.idfrau = context.IDFRAU
    query = largeQuery
  }
  console.log(query, binds)
  const result = await simpleExecute(query, binds)
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
