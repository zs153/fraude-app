import { simpleExecute } from '../services/database.js'

const contadoresSql = "WITH vDates AS (SELECT TO_DATE(:desde,'YYYY-MM-DD') + ROWNUM - 1 AS fecha FROM dual CONNECT BY rownum <= TO_DATE(:hasta,'YYYY-MM-DD') - TO_DATE(:desde,'YYYY-MM-DD') + 1)SELECT v.fecha FECHA,SUM(CASE WHEN cc.sitcie = :cruerr THEN 1 ELSE 0 END) CRUERR,SUM(CASE WHEN cc.sitcie = :sinefe THEN 1 ELSE 0 END) SINEFE,SUM(CASE WHEN cc.sitcie = :tricor THEN 1 ELSE 0 END) TRICOR,SUM(CASE WHEN cc.sitcie = :prescr THEN 1 ELSE 0 END) PRESCR,SUM(CASE WHEN cc.sitcie > 4 THEN 1 ELSE 0 END) OTRCAS,SUM(CASE WHEN cc.sitcie > 0 AND hh.stahit IS NULL THEN 1 ELSE 0 END) CORREC,SUM(CASE WHEN hh.stahit = 2 THEN 1 ELSE 0 END) LIQUID,SUM(CASE WHEN hh.stahit = 4 OR hh.stahit = -1 THEN 1 ELSE 0 END) SANCIO,SUM(CASE WHEN hh.stahit = -1 THEN 1 ELSE 0 END) ANULAD,SUM(CASE WHEN hh.stahit = 2 THEN hh.imphit ELSE 0 END) IMPLIQ,SUM(CASE WHEN hh.stahit = 4 THEN hh.imphit ELSE 0 END) IMPSAN,SUM(CASE WHEN hh.stahit = -1 THEN hh.imphit ELSE 0 END) IMPANU FROM vDates v LEFT JOIN cierres cc ON TRUNC(cc.feccie) = v.fecha AND cc.reffra = :reffra LEFT JOIN hitosfraude hf ON hf.idfrau = cc.idfrau LEFT JOIN hitos hh ON hh.idhito = hf.idhito GROUP BY CUBE(v.fecha)"
const situacionSql = "SELECT TO_CHAR(cc.feccie, 'YYYY-MM-DD') FECCIE,SUM(CASE WHEN cc.sitcie = :cruerr THEN 1 ELSE 0 END) CRUERR,SUM(CASE WHEN cc.sitcie = :sinefe THEN 1 ELSE 0 END) SINEFE,SUM(CASE WHEN cc.sitcie = :tricor THEN 1 ELSE 0 END) TRICOR,SUM(CASE WHEN cc.sitcie = :prescr THEN 1 ELSE 0 END) PRESCR,SUM(CASE WHEN cc.sitcie > 4 THEN 1 ELSE 0 END) OTRCAS,SUM(CASE WHEN cc.sitcie > 0 THEN 1 ELSE 0 END) CORREC FROM cierres cc WHERE cc.reffra = :reffra AND feccie BETWEEN TO_DATE(:desde,'YYYY-MM-DD') AND TO_DATE(:hasta,'YYYY-MM-DD') +24/24 GROUP BY CUBE(TO_CHAR(cc.feccie, 'YYYY-MM-DD'))"
const oficinasSql = "SELECT oo.desofi,SUM(p1.pen) PEN,SUM(p1.adj) ADJ,SUM(p1.res) RES,SUM(p1.pen + p1.adj + p1.res) TOT FROM oficinas oo LEFT JOIN (SELECT ff.ofifra,SUM(CASE WHEN ff.stafra = 0 THEN 1 ELSE 0 END) PEN,SUM(CASE WHEN ff.stafra = 1 THEN 1 ELSE 0 END) ADJ,SUM(CASE WHEN ff.stafra = 2 THEN 1 ELSE 0 END) RES FROM fraudes ff WHERE ff.reffra = :reffra GROUP BY ff.ofifra) p1 ON p1.ofifra = oo.idofic GROUP BY CUBE(desofi) ORDER BY desofi"
const actuacionSql = "SELECT TO_CHAR(cc.feccie, 'YYYY-MM-DD') FECCIE,SUM(CASE WHEN hh.stahit = 2 THEN 1 ELSE 0 END) LIQUID,SUM(CASE WHEN hh.stahit = 4 THEN 1 ELSE 0 END) SANCIO,SUM(CASE WHEN hh.stahit = -1 THEN 1 ELSE 0 END) ANULAD,SUM(CASE WHEN hh.stahit = 2 THEN hh.imphit ELSE 0 END) IMPLIQ,SUM(CASE WHEN hh.stahit = 4 THEN hh.imphit ELSE 0 END) IMPSAN,SUM(CASE WHEN hh.stahit = -1 THEN hh.imphit ELSE 0 END) IMPANU FROM cierres cc INNER JOIN hitosfraude hf ON hf.idfrau = cc.idfrau INNER JOIN hitos hh ON hh.idhito = hf.idhito WHERE cc.reffra = :reffra AND feccie BETWEEN TO_DATE(:desde,'YYYY-MM-DD') AND TO_DATE(:hasta,'YYYY-MM-DD') +24/24 GROUP BY CUBE(TO_CHAR(cc.feccie, 'YYYY-MM-DD'))"

// proc
export const contadores = async (context) => {
  // bind
  let query = contadoresSql
  const bind = context

  if (context.IDOFIC) {
    query += " WHERE idofic = :idofic"
  }
  if (context.CODOFI) {
    query += " WHERE codofi = :codofi"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const situacion = async (context) => {
  // bind
  let query = situacionSql
  const bind = context

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const oficinas = async (context) => {
  // bind
  let query = oficinasSql
  const bind = context

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const actuacion = async (context) => {
  // bind
  let query = actuacionSql
  const bind = context

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
