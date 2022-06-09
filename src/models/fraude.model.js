import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT
  tf.destip,
  ff.*,
  TO_CHAR(ff.fecfra, 'YYYY-MM-DD') "STRFEC"
FROM fraudes ff
INNER JOIN tiposfraude tf ON tf.idtipo = ff.tipfra
`
const largeQuery = `SELECT 
  oo.desofi,
  tt.destip,
  ff.*,
  TO_CHAR(ff.fecfra, 'DD/MM/YYYY') "STRFEC"
FROM fraudes ff
INNER JOIN tiposfraude tt ON tt.idtipo = ff.tipfra
INNER JOIN oficinas oo ON oo.idofic = ff.ofifra
WHERE ff.liqfra = :liqfra
`
const hitosFraudeQuery = `SELECT 
  th.destip,
  hh.idhito,
  TO_CHAR(hh.fechit, 'YYYY-MM-DD') "FECHIT",
  hh.tiphit,
  TO_CHAR(hh.imphit) "IMPHIT",
  hh.obshit,
  hh.stahit,
  TO_CHAR(hh.fechit, 'DD/MM/YYYY') "STRFEC"
FROM hitos hh
INNER JOIN hitosfraude hf ON hf.idhito = hh.idhito
INNER JOIN tiposhito th ON th.idtipo = hh.tiphit
WHERE hf.idfrau = :idfrau
`
const eventosFraudeQuery = `SELECT 
  tt.destip,
  ee.*,
  TO_CHAR(ee.feceve, 'DD/MM/YYYY') "STRFEC"
FROM eventos ee
INNER JOIN eventosfraude ef ON ef.ideven = ee.ideven
INNER JOIN tiposevento tt ON tt.idtipo = ee.tipeve
WHERE ef.idfrau = :idfrau
`
const estadisticaHitosSql = `SELECT
    SUM(p1.proliq) "PROLIQ",
    SUM(p1.prosan) "PROSAN",
    SUM(p1.liquid) "LIQUID",
    SUM(p1.sancio) "SANCIO",
    SUM(p1.anulad) "ANUSAN",
    SUM(p1.imppli) "IMPPLI",
    SUM(p1.imppsa) "IMPPSA",
    SUM(p1.impliq) "IMPLIQ",
    SUM(p1.impsan) "IMPSAN",
    SUM(p1.impanu) "IMPANU"
FROM (SELECT TRUNC(hh.fechit),
    SUM(CASE WHEN hh.stahit = 1 THEN 1 ELSE 0 END) as proliq,
    SUM(CASE WHEN hh.stahit = 2 THEN 1 ELSE 0 END) as liquid,
    SUM(CASE WHEN hh.stahit = 3 THEN 1 ELSE 0 END) as prosan,
    SUM(CASE WHEN hh.stahit = 4 THEN 1 ELSE 0 END) as sancio,
    SUM(CASE WHEN hh.stahit = -1 THEN 1 ELSE 0 END) as anulad,
    SUM(CASE WHEN hh.stahit = 1 THEN hh.imphit ELSE 0 END) as imppli,
    SUM(CASE WHEN hh.stahit = 2 THEN hh.imphit ELSE 0 END) as impliq,
    SUM(CASE WHEN hh.stahit = 3 THEN hh.imphit ELSE 0 END) as imppsa,
    SUM(CASE WHEN hh.stahit = 4 THEN hh.imphit ELSE 0 END) as impsan,
    SUM(CASE WHEN hh.stahit = -1 THEN hh.imphit ELSE 0 END) as impanu
    FROM fcierres fc
    INNER JOIN fraudes ff ON ff.idfrau = fc.idfrau
    INNER JOIN hitosfraude hf ON hf.idfrau = ff.idfrau
    INNER JOIN hitos hh ON hh.idhito = hf.idhito
    WHERE ff.tipfra = :tipfra
        AND fc.feccie BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
    GROUP BY TRUNC(hh.fechit)
) p1
`
const estadisticaOficinaSql = `SELECT 
  oo.desofi,
  SUM(pen) "PEN",
  SUM(adj) "ADJ",
  SUM(res) "RES",
  SUM(pen+adj+res) "TOT"
  FROM (
      WITH vOficinas AS (
        SELECT oo.idofic FROM oficinas oo
      )
      SELECT v.idofic as ofi, 0 as pen, 0 as adj, 0 as res
      FROM vOficinas v
      UNION ALL
      SELECT ff.ofifra,
        SUM(CASE WHEN ff.stafra = 0 THEN 1 ELSE 0 END) as pen,
        SUM(CASE WHEN ff.stafra = 1 THEN 1 ELSE 0 END) as adj,
        SUM(CASE WHEN ff.stafra = 2 THEN 1 ELSE 0 END) as res
        FROM fraudes ff
        WHERE ff.tipfra = :tipfra
          AND ff.fecfra = TO_DATE(:fecfra,'YYYY-MM-DD')
        GROUP BY ff.ofifra
  ) p1
INNER JOIN oficinas oo ON oo.idofic = p1.ofi
GROUP BY ROLLUP(oo.desofi)
`
const estadisticaSituacionSql = `SELECT
  SUM(CASE WHEN sitcie = 0 THEN 1 ELSE 0 END) "ACTUAC",
  SUM(CASE WHEN sitcie > 0 THEN 1 ELSE 0 END) "CORREC",
  SUM(CASE WHEN sitcie = 1 THEN 1 ELSE 0 END) "ACUERR",
  SUM(CASE WHEN sitcie = 2 THEN 1 ELSE 0 END) "ACUDEC",
  SUM(CASE WHEN sitcie = 3 THEN 1 ELSE 0 END) "ACUOTR",
  COUNT(*) "TOTAL"
  FROM fcierres fc
  INNER JOIN fraudes ff ON ff.idfrau = fc.idfrau
  WHERE ff.tipfra = :tipfra
    AND fc.feccie BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
`
const estadisticaActuacionSql = `SELECT fec "FEC",
  SUM(CASE WHEN sta = 2 THEN 1 ELSE 0 END) "LIQ",
  SUM(CASE WHEN sta = 4 THEN 1 ELSE 0 END) "SAN",
  SUM(CASE WHEN sit > 0 THEN 1 ELSE 0 END) "COR"
  FROM
  (
  WITH vDates AS (
    SELECT TO_DATE(:desfec,'YYYY-MM-DD') + ROWNUM - 1 AS fecha
    FROM dual
    CONNECT BY rownum <= TO_DATE(:hasfec,'YYYY-MM-DD') - TO_DATE(:desfec,'YYYY-MM-DD') + 1
  )
  SELECT v.fecha as fec, -1 as sta, -1 as sit
  FROM vDates v
  UNION ALL
  SELECT TRUNC(fc.feccie) as fec, hh.stahit as sta, 0 AS sit    
      FROM fcierres fc
      INNER JOIN fraudes ff ON ff.idfrau = fc.idfrau
      INNER JOIN hitosfraude hf ON hf.idfrau = ff.idfrau
      INNER JOIN hitos hh ON hh.idhito = hf.idhito
      WHERE ff.tipfra = :tipfra
        AND fc.feccie BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
      UNION ALL
      SELECT TRUNC(fc.feccie) as fec, 0 as sta, sitcie as sit
      FROM fcierres fc
      INNER JOIN fraudes ff ON ff.idfrau = fc.idfrau
      WHERE ff.tipfra = :tipfra
        AND fc.feccie BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
  ) p1
GROUP BY fec
ORDER BY fec
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
  :sitcie,
  :usumov,
  :tipmov 
); END;
`
const insertSmsSql = `BEGIN FRAUDE_PKG.INSERTSMSFRAUDE(
  :idfrau,
  :texsms,
  :movsms,
  :stasms,
  :usumov,
  :tipmov,
  :idsmss
); END;
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
const insertEventoSql = `BEGIN FRAUDE_PKG.INSERTEVENTOFRAUDE(
  :idfrau,
  :tipeve,
  :obseve,
  :usumov,
  :tipmov,
  :ideven
); END;
`
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idfrau) {
    binds.idfrau = context.idfrau
    query += `WHERE ff.idfrau = :idfrau`
  }
  if (context.reffra) {
    binds.reffra = context.reffra
    query += `WHERE ff.reffra = :reffra`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = largeQuery
  let binds = {}

  if (!context.stafra) {
    return null
  }

  if (context.stafra === 1) {
    query += `AND ff.stafra = 1
      UNION ALL
      SELECT 
        oo.desofi,
        tt.destip,
        ff.*,
        TO_CHAR(ff.fecfra, 'DD/MM/YYYY') "STRFEC"
      FROM fraudes ff
      INNER JOIN tiposfraude tt ON tt.idtipo = ff.tipfra
      INNER JOIN oficinas oo ON oo.idofic = ff.ofifra
      WHERE ff.stafra = 0`
  } else {
    query += `UNION ALL
      SELECT 
        oo.desofi,
        tt.destip,
        ff.*,
        TO_CHAR(ff.fecfra, 'DD/MM/YYYY') "STRFEC"
      FROM fraudes ff
      INNER JOIN tiposfraude tt ON tt.idtipo = ff.tipfra
      INNER JOIN oficinas oo ON oo.idofic = ff.ofifra
      WHERE ff.stafra = 0`
  }
  binds.liqfra = context.liqfra


  const result = await simpleExecute(query, binds)

  return result.rows
}
export const findHitosFraude = async (context) => {
  let query = hitosFraudeQuery
  let binds = {}

  binds.idfrau = context.idfrau

  const result = await simpleExecute(query, binds)

  return result.rows
}
export const findEventosFraude = async (context) => {
  let query = eventosFraudeQuery
  let binds = {}

  binds.idfrau = context.idfrau

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
export const statHitos = async (bind) => {
  let result

  delete bind.fecfra
  try {
    result = await simpleExecute(estadisticaHitosSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows[0]
}
export const statOficinas = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaOficinaSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const statSituacion = async (bind) => {
  let result

  delete bind.fecfra
  try {
    result = await simpleExecute(estadisticaSituacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows[0]
}
export const statActuacion = async (bind) => {
  let result

  delete bind.fecfra
  try {
    result = await simpleExecute(estadisticaActuacionSql, bind)
  } catch (error) {
    result = null
  }

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
