import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const estadisticaSitActSql = `SELECT 
    TO_CHAR(cc.feccie, 'YYYY-MM-DD') "FECCIE",
    SUM(CASE WHEN cc.sitcie = :cruerr THEN 1 ELSE 0 END) "CRUERR",
    SUM(CASE WHEN cc.sitcie = :sinefe THEN 1 ELSE 0 END) "SINEFE",
    SUM(CASE WHEN cc.sitcie = :tricor THEN 1 ELSE 0 END) "TRICOR",
    SUM(CASE WHEN cc.sitcie = :prescr THEN 1 ELSE 0 END) "PRESCR",
    SUM(CASE WHEN cc.sitcie > 4 THEN 1 ELSE 0 END) "OTRCAS",
    SUM(CASE WHEN cc.sitcie > 0 THEN 1 ELSE 0 END) "CORREC",
    SUM(CASE WHEN hh.stahit = 2 THEN 1 ELSE 0 END) "LIQUID",
    SUM(CASE WHEN hh.stahit = 4 THEN 1 ELSE 0 END) "SANCIO",
    SUM(CASE WHEN hh.stahit = -1 THEN 1 ELSE 0 END) "ANULAD",
    SUM(CASE WHEN hh.stahit = 2 THEN hh.imphit ELSE 0 END) "IMPLIQ",
    SUM(CASE WHEN hh.stahit = 4 THEN hh.imphit ELSE 0 END) "IMPSAN",
    SUM(CASE WHEN hh.stahit = -1 THEN hh.imphit ELSE 0 END) "IMPANU"
  FROM cierres cc
  LEFT JOIN hitosfraude hf ON hf.idfrau = cc.idfrau
  LEFT JOIN hitos hh ON hh.idhito = hf.idhito
  WHERE cc.reffra = :reffra AND
    feccie BETWEEN TO_DATE(:desde,'YYYY-MM-DD') AND TO_DATE(:hasta,'YYYY-MM-DD') +24/24
  GROUP BY CUBE(TO_CHAR(cc.feccie, 'YYYY-MM-DD'))
`
const estadisticaSituacionSql = `SELECT 
  TO_CHAR(cc.feccie, 'YYYY-MM-DD') "FECCIE",
  SUM(CASE WHEN cc.sitcie = :cruerr THEN 1 ELSE 0 END) "CRUERR",
  SUM(CASE WHEN cc.sitcie = :sinefe THEN 1 ELSE 0 END) "SINEFE",
  SUM(CASE WHEN cc.sitcie = :tricor THEN 1 ELSE 0 END) "TRICOR",
  SUM(CASE WHEN cc.sitcie = :prescr THEN 1 ELSE 0 END) "PRESCR",
  SUM(CASE WHEN cc.sitcie > 4 THEN 1 ELSE 0 END) "OTRCAS",
  SUM(CASE WHEN cc.sitcie > 0 THEN 1 ELSE 0 END) "CORREC"
FROM cierres cc
WHERE cc.reffra = :reffra AND
  feccie BETWEEN TO_DATE(:desde,'YYYY-MM-DD') AND TO_DATE(:hasta,'YYYY-MM-DD') +24/24
GROUP BY CUBE(TO_CHAR(cc.feccie, 'YYYY-MM-DD'))
`
const estadisticaOficinaSql = `SELECT oo.desofi, 
  SUM(p1.pen) "PEN", 
  SUM(p1.adj) "ADJ", 
  SUM(p1.res) "RES",
  SUM(p1.pen + p1.adj + p1.res) "TOT"
FROM oficinas oo
LEFT JOIN (
SELECT ff.ofifra,
  SUM(CASE WHEN ff.stafra = 0 THEN 1 ELSE 0 END) "PEN",
  SUM(CASE WHEN ff.stafra = 1 THEN 1 ELSE 0 END) "ADJ",
  SUM(CASE WHEN ff.stafra = 2 THEN 1 ELSE 0 END) "RES"
FROM fraudes ff
WHERE ff.reffra = :reffra
GROUP BY ff.ofifra) p1 ON p1.ofifra = oo.idofic
GROUP BY CUBE(desofi)
ORDER BY desofi
`
const estadisticaActuacionSql = `SELECT 
  TO_CHAR(cc.feccie, 'YYYY-MM-DD') "FECCIE",
  SUM(CASE WHEN hh.stahit = 2 THEN 1 ELSE 0 END) "LIQUID",
  SUM(CASE WHEN hh.stahit = 4 THEN 1 ELSE 0 END) "SANCIO",
  SUM(CASE WHEN hh.stahit = -1 THEN 1 ELSE 0 END) "ANULAD",
  SUM(CASE WHEN hh.stahit = 2 THEN hh.imphit ELSE 0 END) "IMPLIQ",
  SUM(CASE WHEN hh.stahit = 4 THEN hh.imphit ELSE 0 END) "IMPSAN",
  SUM(CASE WHEN hh.stahit = -1 THEN hh.imphit ELSE 0 END) "IMPANU"
FROM cierres cc
INNER JOIN hitosfraude hf ON hf.idfrau = cc.idfrau
INNER JOIN hitos hh ON hh.idhito = hf.idhito
WHERE cc.reffra = :reffra AND
  feccie BETWEEN TO_DATE(:desde,'YYYY-MM-DD') AND TO_DATE(:hasta,'YYYY-MM-DD') +24/24
GROUP BY CUBE(TO_CHAR(cc.feccie, 'YYYY-MM-DD'))
`

export const sitAct = async (context) => {
  let result

  try {
    result = await simpleExecute(estadisticaSitActSql, context)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const statSituacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaSituacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
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
export const statActuacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaActuacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
