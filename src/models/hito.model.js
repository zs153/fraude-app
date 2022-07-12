import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idhito,
  TO_CHAR(fechit, 'YYYY-MM-DD') "FECHIT",
  tiphit,
  TO_CHAR(imphit) "IMPHIT",
  obshit,
  stahit,
  TO_CHAR(fechit, 'DD/MM/YYYY') "STRFEC"
FROM hitos
`
const largeQuery = `SELECT 
  tt.destip,
  hh.idhito,
  TO_CHAR(hh.fechit, 'YYYY-MM-DD') "FECHIT",
  hh.tiphit,
  TO_CHAR(hh.imphit) "IMPHIT",
  hh.obshit,
  hh.stahit,
  TO_CHAR(hh.fechit, 'DD/MM/YYYY') "STRFEC"
FROM hitos hh
INNER JOIN hitosfraude hf ON hf.idhito = hh.idhito
INNER JOIN tipos tt ON tt.idtipo = hh.tiphit
WHERE hf.idfrau = :idfrau
`
const insertSql = `BEGIN FRAUDE_PKG.INSERTHITO(
  :tiphit,
  :imphit,
  :obshit,
  :stahit,
  :usumov,
  :tipmov,
  :idhito
); END;
`
const updateSql = `BEGIN FRAUDE_PKG.UPDATEHITO(
  :idhito,
  :tiphit,
  :imphit,
  :obshit,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FRAUDE_PKG.DELETEHITO(
  :idhito,
  :usumov,
  :tipmov 
); END;
`
const cambioSql = `BEGIN FRAUDE_PKG.CAMBIOESTADOHITO(
  :idhito,
  :stahit,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idhito) {
    binds.idhito = context.idhito
    query += `WHERE idhito = :idhito`
  }

  const result = await simpleExecute(query, binds)

  return result.rows
}
export const findAll = async (context) => {
  let query = largeQuery
  let binds = {}

  if (!context.idfrau) {
    return null
  }
  binds.idfrau = context.idfrau

  const result = await simpleExecute(query, binds)

  return result.rows
}

export const insert = async (bind) => {
  bind.idhito = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idhito = await result.outBinds.idhito
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
