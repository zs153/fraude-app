import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const estadisticaSituacionSql = `SELECT 
  refdoc,
  SUM(CASE WHEN stadoc = 0 THEN 1 ELSE 0 END) "PEN",
  SUM(CASE WHEN stadoc = 1 THEN 1 ELSE 0 END) "ASI",
  SUM(CASE WHEN stadoc = 2 THEN 1 ELSE 0 END) "RES",
  COUNT(*) "TOT"
FROM documentos
WHERE refdoc = :refdoc
GROUP BY refdoc
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
      SELECT dd.ofidoc,
        SUM(CASE WHEN dd.stadoc = 0 THEN 1 ELSE 0 END) as pen,
        SUM(CASE WHEN dd.stadoc = 1 THEN 1 ELSE 0 END) as adj,
        SUM(CASE WHEN dd.stadoc = 2 THEN 1 ELSE 0 END) as res
        FROM documentos dd
        WHERE dd.refdoc = :refcar
        GROUP BY dd.ofidoc
  ) p1
INNER JOIN oficinas oo ON oo.idofic = p1.ofi
GROUP BY ROLLUP(oo.desofi)
`
const estadisticaActuacionSql = `WITH 
  vDates AS (
    SELECT TO_DATE(:desfec,'YYYY-MM-DD') + ROWNUM - 1 AS fecha
    FROM dual
    CONNECT BY rownum <= TO_DATE(:hasfec,'YYYY-MM-DD') - TO_DATE(:desfec,'YYYY-MM-DD') + 1
  )
  SELECT TO_CHAR(v.fecha, 'YYYY-MM-DD') as fec, 0 "ASI", 0 "RES"
  FROM vDates v
  UNION ALL
  SELECT 
      TO_CHAR(mm.fecmov, 'YYYY-MM-DD') as fec, 
      SUM(CASE WHEN mm.tipmov = 15 THEN 1 ELSE 0 END) "ASI",
      SUM(CASE WHEN mm.tipmov = 16 THEN 1 ELSE 0 END) "RES"
  FROM movimientosdocumento md
  INNER JOIN documentos dd ON dd.iddocu = md.iddocu
  INNER JOIN movimientos mm ON mm.idmovi = md.idmovi
  WHERE dd.refdoc = :refdoc AND 
      (mm.tipmov = :tipoAsign OR mm.tipmov = :tipoResol) AND
      mm.fecmov BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
  GROUP BY TO_CHAR(mm.fecmov, 'YYYY-MM-DD')
`

export const statSituacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaSituacionSql, bind)
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
export const statActuacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaActuacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
