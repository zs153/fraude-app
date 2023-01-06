import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

// fraude
const baseQuery = `SELECT
  oo.desofi,
  tf.destip,
  ff.*,
  TO_CHAR(ff.fecfra, 'DD/MM/YYYY') "STRFEC"
FROM fraudes ff
INNER JOIN tiposfraude tf ON tf.idtipo = ff.tipfra
INNER JOIN oficinas oo ON oo.idofic = ff.ofifra
`
const largeQuery = `SELECT 
  oo.desofi, tt.destip, 
  ff.reffra, ff.liqfra, ff.ejefra, ff.nifcon, ff.nomcon, ff.movcon, ff.obsfra, ff.stafra,
  p1.*,
  TO_CHAR(ff.fecfra, 'DD/MM/YYYY') "STRFEC"
FROM (
  SELECT
    ff.idfrau,
    SUM(CASE WHEN hh.tiphit = 1 THEN 1 ELSE 0 END) AS "PROLIQ",
    SUM(CASE WHEN hh.tiphit = 2 THEN 1 ELSE 0 END) AS "LIQUID",
    SUM(CASE WHEN hh.tiphit = 3 THEN 1 ELSE 0 END) AS "PROSAN",
    SUM(CASE WHEN hh.tiphit = 4 THEN 1 ELSE 0 END) AS "SANCIO",
    COUNT(hf.idhito) AS "NUMHIT",
    COUNT(ef.ideven) AS "NUMEVE"
  FROM fraudes ff
  LEFT JOIN hitosfraude hf ON hf.idfrau = ff.idfrau
  LEFT JOIN hitos hh ON hh.idhito = hf.idhito
  LEFT JOIN eventosfraude ef ON ef.idfrau = ff.idfrau
  LEFT JOIN eventos ee ON ee.ideven = ef.ideven
  WHERE liqfra = :liqfra
      AND ff.stafra = 1
  GROUP BY ff.idfrau
  UNION
  SELECT 
    ff.idfrau, 0 "PROLIQ", 0 "LIQUID", 0 "PROSAN", 0 "SANCIO", 0 "NUMHIT", 0 "NUMEVE"
  FROM fraudes ff
  WHERE ff.stafra = 0
) p1
INNER JOIN fraudes ff ON ff.idfrau = p1.idfrau
INNER JOIN tiposfraude tt ON tt.idtipo = ff.tipfra
INNER JOIN oficinas oo ON oo.idofic = ff.ofifra
ORDER BY ff.stafra DESC
`
const extendedQuery = `SELECT 
  ff.idfrau, ff.fecfra, ff.nifcon, ff.nomcon, ff.ejefra, ff.obsfra, tf.destip "TIPFRA", 
  hh.idhito, hh.fechit, hh.imphit, hh.obshit, hh.stahit, th.destip "TIPHIT", 
  ee.ideven, ee.feceve, ee.obseve, te.destip "TIPEVE",
  oo.desofi
FROM (
  SELECT hf.idfrau, hf.idhito, null "IDEVEN" FROM hitosfraude hf 
  WHERE hf.idfrau = :idfrau
  UNION
  SELECT ef.idfrau, null "IDHITO", ef.ideven FROM eventosfraude ef 
  WHERE ef.idfrau = :idfrau
) p1
LEFT JOIN fraudes ff ON ff.idfrau = p1.idfrau
LEFT JOIN hitos hh ON hh.idhito = p1.idhito
LEFT JOIN eventos ee ON ee.ideven = p1.ideven
LEFT JOIN tiposfraude tf ON tf.idtipo = ff.tipfra
LEFT JOIN tiposhito th ON th.idtipo = hh.tiphit
LEFT JOIN tiposevento te ON te.idtipo = ee.tipeve
LEFT JOIN oficinas oo ON oo.idofic = ff.ofifra
WHERE ff.idfrau = :idfrau
`
const insertSql = `BEGIN FRAUDE_PKG.INSERTFRAUDE(
  TO_DATE(:fecfra, 'YYYY-MM-DD'),
  :nifcon,
  :nomcon,
  :emacon,
  :telcon,
  :movcon,
  :reffra,
  :tipfra,
  :ejefra,
  :ofifra,
  :obsfra,
  :funfra,
  :liqfra,
  :stafra,
  :usumov,
  :tipmov,
  :idfrau
); END;
`
const updateSql = `BEGIN FRAUDE_PKG.UPDATEFRAUDE(
  :idfrau,
  TO_DATE(:fecfra,'YYYY-MM-DD'),
  :nifcon, 
  :nomcon, 
  :emacon, 
  :telcon, 
  :movcon, 
  :tipfra, 
  :ejefra, 
  :ofifra, 
  :obsfra,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FRAUDE_PKG.DELETEFRAUDE(
  :idfrau,
  :usumov,
  :tipmov 
); END;
`
const cambioSql = `BEGIN FRAUDE_PKG.CAMBIOESTADOFRAUDE(
  :idfrau,
  :liqfra,
  :stafra,
  :usumov,
  :tipmov 
); END;
`
const unasignSql = `BEGIN FRAUDE_PKG.UNASIGNFRAUDE(
  :idfrau,
  :liqfra,
  :stafra,
  :usumov,
  :tipmov 
); END;
`
const cierreSql = `BEGIN FRAUDE_PKG.CIERREFRAUDE(
  :idfrau,
  :liqfra,
  :stafra,
  :reffra,
  :sitcie,
  :usumov,
  :tipmov 
); END;
`
// hito
const hitosQuery = `SELECT 
  th.destip,
  hh.*,
  TO_CHAR(hh.fechit, 'DD/MM/YYYY') "STRFEC"
FROM hitos hh
INNER JOIN tiposhito th ON th.idtipo = hh.tiphit
`
const insertHitoSql = `BEGIN FRAUDE_PKG.INSERTHITOFRAUDE(
  :idfrau,
  :tiphit,
  :imphit,
  :obshit,
  :stahit,
  :usumov,
  :tipmov,
  :idhito
); END;
`
const updateHitoSql = `BEGIN FRAUDE_PKG.UPDATEHITO(
  :idhito,
  TO_DATE(:fechit, 'YYYY-MM-DD'),
  :tiphit,
  :imphit,
  :obshit,
  :usumov,
  :tipmov
); END;
`
const removeHitoSql = `BEGIN FRAUDE_PKG.DELETEHITOFRAUDE(
  :idfrau,
  :idhito,
  :usumov,
  :tipmov 
); END;
`
const insertHitoLiquidacionSql = `BEGIN FRAUDE_PKG.INSERTHITOLIQFRAUDE(
  :idfrau,
  :tiphit,
  :imphit,
  :obshit,
  :stahit,
  :tipliq,
  :impliq,
  :obsliq,
  :staliq,
  :usumov,
  :tipmov,
  :idhito
); END;
`
const insertHitoSancionSql = `BEGIN FRAUDE_PKG.INSERTHITOSANFRAUDE(
  :idfrau,
  :tiphit,
  :imphit,
  :obshit,
  :stahit,
  :tipsan,
  :impsan,
  :obssan,
  :stasan,
  :usumov,
  :tipmov,
  :idhito
); END;
`
const cambioEstadoHitoSql = `BEGIN FRAUDE_PKG.CAMBIOESTADOHITO(
  :idhito,
  :stahit,
  :usumov,
  :tipmov
); END;
`

// evento
const eventosQuery = `SELECT 
  tt.destip,
  ee.*,
  TO_CHAR(ee.feceve, 'DD/MM/YYYY') "STRFEC"
FROM eventos ee
INNER JOIN tiposevento tt ON tt.idtipo = ee.tipeve
`
const insertEventoSql = `BEGIN FRAUDE_PKG.INSERTEVENTOFRAUDE(
  :idfrau,
  TO_DATE(:feceve, 'YYYY-MM-DD'),
  :tipeve,
  :obseve,
  :usumov,
  :tipmov,
  :ideven
); END;
`
const updateEventoSql = `BEGIN FRAUDE_PKG.UPDATEEVENTO(
  :ideven,
  TO_DATE(:feceve, 'YYYY-MM-DD'),
  :tipeve,
  :obseve,
  :usumov,
  :tipmov
); END;
`
const removeEventoSql = `BEGIN FRAUDE_PKG.DELETEEVENTOFRAUDE(
  :idfrau,
  :ideven,
  :usumov,
  :tipmov 
); END;
`
// sms
const smssQuery = `SELECT 
  ss.*,
  TO_CHAR(ss.fecsms, 'DD/MM/YYYY') "STRFEC"
FROM smss ss
`
const insertSmsSql = `BEGIN FRAUDE_PKG.INSERTSMSFRAUDE(
  :idfrau,
  TO_DATE(:fecsms, 'YYYY-MM-DD'),
  :texsms,
  :movsms,
  :stasms,
  :usumov,
  :tipmov,
  :idsmss
); END;
`
const updateSmsSql = `BEGIN FRAUDE_PKG.UPDATESMS(
  :idsmss,
  TO_DATE(:fecsms, 'YYYY-MM-DD'),
  :texsms,
  :movsms,
  :usumov,
  :tipmov
); END;
`
const removeSmsSql = `BEGIN FRAUDE_PKG.DELETESMSFRAUDE(
  :idfrau,
  :idsmss,
  :usumov,
  :tipmov 
); END;
`
// relacion
const relacionesQuery = `SELECT 
  rr.*,
  TO_CHAR(rr.fecrel, 'DD/MM/YYYY') "STRFEC"
FROM relaciones rr
`
const insertRelacionSql = `BEGIN FRAUDE_PKG.INSERTRELACIONFRAUDE(
  :idfrau,
  TO_DATE(:fecrel, 'YYYY-MM-DD'),
  :nifcon,
  :nomcon,
  :usumov,
  :tipmov,
  :idrela
); END;
`
const updateRelacionSql = `BEGIN FRAUDE_PKG.UPDATERELACION(
  :idrela,
  TO_DATE(:fecrel, 'YYYY-MM-DD'),
  :nifcon,
  :nomcon,
  :usumov,
  :tipmov
); END;
`
const removeRelacionSql = `BEGIN FRAUDE_PKG.DELETERELACIONFRAUDE(
  :idfrau,
  :idrela,
  :usumov,
  :tipmov 
); END;
`

// proc fraude
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.IDFRAU) {
    binds.idfrau = context.IDFRAU
    query += `WHERE ff.idfrau = :idfrau`
  } else if (context.REFFRA) {
    binds.reffra = context.REFFRA
    query += `WHERE ff.reffra = :reffra`
  } else if (context.LIQFRA) {
    binds.liqfra = context.LIQFRA
    if (context.STAFRA === 1) {
      // mostrar asignados al liquidador y todos los no asignados
      query = largeQuery
    } else {
      // mostrar los resueltos por el liquidador
      query += `WHERE ff.liqfra = :liqfra
        AND stafra = 2
      `
    }
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const extended = async (context) => {
  let query = extendedQuery
  let binds = {}

  if (context.IDFRAU) {
    binds.idfrau = context.IDFRAU
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insert = async (bind) => {
  bind.idfrau = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idfrau = await result.outBinds.idfrau
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
export const unasing = async (bind) => {
  let result

  try {
    await simpleExecute(unasignSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const cierre = async (bind) => {
  let result

  try {
    await simpleExecute(cierreSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// proc hitos
export const findHitos = async (context) => {
  let query = hitosQuery
  let binds = {}

  if (context.IDHITO) {
    binds.idhito = context.IDHITO
    query += `WHERE hh.idhito = :idhito`
  } else if (context.IDFRAU) {
    binds.idfrau = context.IDFRAU
    query += `INNER JOIN hitosfraude hf ON hf.idhito = hh.idhito
      WHERE hf.idfrau = :idfrau`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insertHito = async (bind) => {
  bind.idhito = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertHitoSql, bind)

    bind.idhito = await result.outBinds.idhito
  } catch (error) {
    bind = null
  }

  return bind
}
export const updateHito = async (bind) => {
  let result

  try {
    await simpleExecute(updateHitoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const removeHito = async (bind) => {
  let result

  try {
    await simpleExecute(removeHitoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const insertHitoLiquidacion = async (bind) => {
  bind.idhito = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertHitoLiquidacionSql, bind)
    bind.idhito = await result.outBinds.idhito
  } catch (error) {
    bind = null
  }

  return bind
}
export const insertHitoSancion = async (bind) => {
  bind.idhito = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertHitoSancionSql, bind)
    bind.idhito = await result.outBinds.idhito
  } catch (error) {
    bind = null
  }

  return bind
}
export const cambioEstadoHito = async (bind) => {
  let result

  try {
    await simpleExecute(cambioEstadoHitoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// proc evento
export const findEventos = async (context) => {
  let query = eventosQuery
  let binds = {}

  if (context.IDEVEN) {
    binds.ideven = context.IDEVEN
    query += `WHERE ee.ideven = :ideven`
  } else if (context.IDFRAU) {
    binds.idfrau = context.IDFRAU
    query += `INNER JOIN eventosfraude ef ON ef.ideven = ee.ideven
      WHERE ef.idfrau = :idfrau`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insertEvento = async (bind) => {
  bind.ideven = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertEventoSql, bind)

    bind.ideven = await result.outBinds.ideven
  } catch (error) {
    bind = null
  }

  return bind
}
export const updateEvento = async (bind) => {
  let result

  try {
    await simpleExecute(updateEventoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const removeEvento = async (bind) => {
  let result

  try {
    await simpleExecute(removeEventoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// proc sms
export const findSmss = async (context) => {
  let query = smssQuery
  let binds = {}

  if (context.IDFRAU) {
    binds.idfrau = context.IDFRAU
    query += `INNER JOIN smssfraude sf ON sf.idsmss = ss.idsmss
      WHERE sf.idfrau = :idfrau`
  } else if (context.IDSMSS) {
    binds.idsmss = context.IDSMSS
    query += `WHERE ss.idsmss = :idsmss`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insertSms = async (bind) => {
  bind.idsmss = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSmsSql, bind)

    bind.idsmss = await result.outBinds.idsmss
  } catch (error) {
    bind = null
  }

  return bind
}
export const updateSms = async (bind) => {
  let result

  try {
    await simpleExecute(updateSmsSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const removeSms = async (bind) => {
  let result

  try {
    await simpleExecute(removeSmsSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// proc relacion
export const findRelaciones = async (context) => {
  let query = relacionesQuery
  let binds = {}

  if (context.IDFRAU) {
    binds.idfrau = context.IDFRAU
    query += `INNER JOIN relacionesfraude rf ON rf.idrela = rr.idrela
      WHERE rf.idfrau = :idfrau`
  } else if (context.IDRELA) {
    binds.idrela = context.IDRELA
    query += `WHERE rr.idrela = :idrela`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insertRelacion = async (bind) => {
  bind.idrela = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertRelacionSql, bind)

    bind.idrela = await result.outBinds.idrela
  } catch (error) {
    bind = null
  }

  return bind
}
export const updateRelacion = async (bind) => {
  let result

  try {
    await simpleExecute(updateRelacionSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const removeRelacion = async (bind) => {
  let result

  try {
    await simpleExecute(removeRelacionSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}