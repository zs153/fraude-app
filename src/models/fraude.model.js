import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from '../services/database.js';

// fraude
const baseQuery = "SELECT ff.*,oo.desofi,tf.destip FROM fraudes ff INNER JOIN tiposfraude tf ON tf.idtipo = ff.tipfra INNER JOIN oficinas oo ON oo.idofic = ff.ofifra"
const largeQuery = "SELECT ff.*,oo.desofi,tt.destip,p1.* FROM (SELECT ff.idfrau,SUM(CASE WHEN hh.tiphit = 1 THEN 1 ELSE 0 END) AS PROLIQ,SUM(CASE WHEN hh.tiphit = 2 THEN 1 ELSE 0 END) AS LIQUID,SUM(CASE WHEN hh.tiphit = 3 THEN 1 ELSE 0 END) AS PROSAN,SUM(CASE WHEN hh.tiphit = 4 THEN 1 ELSE 0 END) AS SANCIO,COUNT(hf.idhito) AS NUMHIT,COUNT(ef.ideven) AS NUMEVE FROM fraudes ff LEFT JOIN hitosfraude hf ON hf.idfrau = ff.idfrau LEFT JOIN hitos hh ON hh.idhito = hf.idhito LEFT JOIN eventosfraude ef ON ef.idfrau = ff.idfrau LEFT JOIN eventos ee ON ee.ideven = ef.ideven WHERE liqfra = :liqfra AND ff.stafra = 1 GROUP BY ff.idfrau UNION SELECT ff.idfrau, 0 PROLIQ, 0 LIQUID, 0 PROSAN, 0 SANCIO, 0 NUMHIT, 0 NUMEVE FROM fraudes ff WHERE ff.stafra = 0) p1 INNER JOIN fraudes ff ON ff.idfrau = p1.idfrau INNER JOIN tiposfraude tt ON tt.idtipo = ff.tipfra INNER JOIN oficinas oo ON oo.idofic = ff.ofifra ORDER BY ff.stafra DESC"
const extendedQuery = "SELECT ff.idfrau,ff.fecfra,ff.nifcon,ff.nomcon,ff.ejefra,ff.obsfra,tf.destip TIPFRA,hh.idhito,hh.fechit,hh.imphit,hh.obshit,hh.stahit,th.destip TIPHIT,ee.ideven, ee.feceve, ee.obseve, te.destip TIPEVE,oo.desofi FROM (SELECT hf.idfrau, hf.idhito, null IDEVEN FROM hitosfraude hf WHERE hf.idfrau = :idfrau UNION SELECT ef.idfrau, null IDHITO, ef.ideven FROM eventosfraude ef WHERE ef.idfrau = :idfrau) p1 LEFT JOIN fraudes ff ON ff.idfrau = p1.idfrau LEFT JOIN hitos hh ON hh.idhito = p1.idhito LEFT JOIN eventos ee ON ee.ideven = p1.ideven LEFT JOIN tiposfraude tf ON tf.idtipo = ff.tipfra LEFT JOIN tiposhito th ON th.idtipo = hh.tiphit LEFT JOIN tiposevento te ON te.idtipo = ee.tipeve LEFT JOIN oficinas oo ON oo.idofic = ff.ofifra WHERE ff.idfrau = :idfrau"
const insertSql = "BEGIN FRAUDE_PKG.INSERTFRAUDE(TO_DATE(:fecfra, 'YYYY-MM-DD'),:nifcon,:nomcon,:emacon,:telcon,:movcon,:reffra,:tipfra,:ejefra,:ofifra,:obsfra,:funfra,:liqfra,:stafra,:usumov,:tipmov,:idfrau); END;"
const updateSql = "BEGIN FRAUDE_PKG.UPDATEFRAUDE(:idfrau,TO_DATE(:fecfra,'YYYY-MM-DD'),:nifcon,:nomcon,:emacon,:telcon,:movcon,:tipfra,:ejefra,:ofifra,:obsfra,:usumov,:tipmov); END;"
const removeSql = "BEGIN FRAUDE_PKG.DELETEFRAUDE(:idfrau,:usumov,:tipmov ); END;"
const cambioSql = "BEGIN FRAUDE_PKG.CAMBIOESTADOFRAUDE(:idfrau,:liqfra,:stafra,:usumov,:tipmov ); END;"
const unasignSql = "BEGIN FRAUDE_PKG.UNASIGNFRAUDE(:idfrau,:liqfra,:stafra,:usumov,:tipmov ); END;"
const cierreSql = "BEGIN FRAUDE_PKG.CIERREFRAUDE(:idfrau,:liqfra,:stafra,:reffra,:sitcie,:usumov,:tipmov ); END;"
// hito
const hitosQuery = "SELECT hh.*,th.destip FROM hitos hh INNER JOIN tiposhito th ON th.idtipo = hh.tiphit"
const insertHitoSql = "BEGIN FRAUDE_PKG.INSERTHITOFRAUDE(:idfrau,:tiphit,:imphit,:obshit,:stahit,:usumov,:tipmov,:idhito); END;"
const updateHitoSql = "BEGIN FRAUDE_PKG.UPDATEHITO(:idhito,:tiphit,:imphit,:obshit,:usumov,:tipmov); END;"
const removeHitoSql = "BEGIN FRAUDE_PKG.DELETEHITOFRAUDE(:idfrau,:idhito,:usumov,:tipmov ); END;"
const insertHitoLiquidacionSql = "BEGIN FRAUDE_PKG.INSERTHITOLIQFRAUDE(:idfrau,:tiphit,:imphit,:obshit,:stahit,:tipliq,:impliq,:obsliq,:staliq,:usumov,:tipmov,:idhito); END;"
const insertHitoSancionSql = "BEGIN FRAUDE_PKG.INSERTHITOSANFRAUDE(:idfrau,:tiphit,:imphit,:obshit,:stahit,:tipsan,:impsan,:obssan,:stasan,:usumov,:tipmov,:idhito); END;"
const cambioEstadoHitoSql = "BEGIN FRAUDE_PKG.CAMBIOESTADOHITO(:idhito,:stahit,:usumov,:tipmov); END;"
// evento
const eventosQuery = "SELECT ee.*,tt.destip FROM eventos ee INNER JOIN tiposevento tt ON tt.idtipo = ee.tipeve"
const insertEventoSql = "BEGIN FRAUDE_PKG.INSERTEVENTOFRAUDE(:idfrau,:tipeve,:obseve,:usumov,:tipmov,:ideven); END;"
const updateEventoSql = "BEGIN FRAUDE_PKG.UPDATEEVENTO(:ideven,:tipeve,:obseve,:usumov,:tipmov); END;"
const removeEventoSql = "BEGIN FRAUDE_PKG.DELETEEVENTOFRAUDE(:idfrau,:ideven,:usumov,:tipmov ); END;"
// sms
const smssQuery = "SELECT ss.* FROM smss ss"
const insertSmsSql = "BEGIN FRAUDE_PKG.INSERTSMSFRAUDE(:idfrau,TO_DATE(:fecsms, 'YYYY-MM-DD'),:texsms,:movsms,:stasms,:usumov,:tipmov,:idsmss); END;"
const updateSmsSql = "BEGIN FRAUDE_PKG.UPDATESMS(:idsmss,TO_DATE(:fecsms, 'YYYY-MM-DD'),:texsms,:movsms,:usumov,:tipmov); END;"
const removeSmsSql = "BEGIN FRAUDE_PKG.DELETESMSFRAUDE(:idfrau,:idsmss,:usumov,:tipmov ); END;"
// relacion
const relacionesQuery = "SELECT rr.* FROM relaciones rr"
const insertRelacionSql = "BEGIN FRAUDE_PKG.INSERTRELACIONFRAUDE(:idfrau,TO_DATE(:fecrel, 'YYYY-MM-DD'),:nifcon,:nomcon,:usumov,:tipmov,:idrela); END;"
const updateRelacionSql = "BEGIN FRAUDE_PKG.UPDATERELACION(:idrela,TO_DATE(:fecrel, 'YYYY-MM-DD'),:nifcon,:nomcon,:usumov,:tipmov); END;"
const removeRelacionSql = "BEGIN FRAUDE_PKG.DELETERELACIONFRAUDE(:idfrau,:idrela,:usumov,:tipmov ); END;"

// proc fraude
export const fraude = async (context) => {
  let query = baseQuery
  let bind = context

  if (context.IDFRAU) {
    query += " WHERE ff.idfrau = :idfrau"
  } else if (context.REFFRA) {
    query += " WHERE ff.reffra = :reffra"
  } else if (context.LIQFRA) {
    if (context.STAFRA === 1) {
      //TODO
      // mostrar asignados al liquidador y todos los no asignados
      query = largeQuery
    } else {
      //TODO
      // mostrar los resueltos por el liquidador
      query += " WHERE ff.liqfra = :liqfra AND stafra = 2"
    }
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const fraudes = async (context) => {
  // bind
  let query = "WITH datos AS (SELECT ff.idfrau,ff.fecfra,ff.ejefra,ff.nifcon,ff.nomcon,ff.obsfra,ff.ofifra,ff.liqfra,ff.stafra,oo.desofi,tf.destip,numhit,numeve FROM (SELECT ff.idfrau,count(hf.idhito) numhit,count(ef.ideven) numeve FROM fraudes ff LEFT JOIN hitosfraude hf ON hf.idfrau= ff.idfrau LEFT JOIN eventosfraude ef ON ef.idfrau = ff.idfrau GROUP BY ff.idfrau) p1 RIGHT JOIN fraudes ff ON ff.idfrau = p1.idfrau INNER JOIN oficinas oo ON oo.idofic = ff.ofifra INNER JOIN tiposfraude tf ON tf.idtipo = ff.tipfra WHERE (liqfra = :liqfra AND stafra = :stafra) OR (ofifra = :ofifra AND stafra = 0))"
  let bind = {
    liqfra: context.liquidador,
    stafra: context.estado,
    ofifra: context.oficina,
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idfrau = context.cursor.next;
    query += "SELECT * FROM datos WHERE idfrau > :idfrau AND (nifcon LIKE '%' || :part || '%' OR nomcon LIKE '%' || :part || '%' OR ejefra LIKE '%' || :part || '%' OR fecfra LIKE '%' || :part || '%' OR destip LIKE '%' || :part || '%' OR desofi LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY idfrau ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idfrau = context.cursor.prev;
    query += "SELECT * FROM datos WHERE idfrau < :idfrau AND (nifcon LIKE '%' || :part || '%' OR nomcon LIKE '%' || :part || '%' OR ejefra LIKE '%' || :part || '%' OR fecfra LIKE '%' || :part || '%' OR destip LIKE '%' || :part || '%' OR desofi LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY idfrau DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const extended = async (context) => {
  // bind
  let query = "WITH datos AS (SELECT ff.idfrau,ff.fecfra,ff.ejefra,ff.nifcon,ff.nomcon,ff.obsfra,ff.ofifra,ff.liqfra,ff.stafra,oo.desofi,tf.destip FROM fraudes ff INNER JOIN oficinas oo ON oo.idofic = ff.ofifra INNER JOIN tiposfraude tf ON tf.idtipo = ff.tipfra WHERE (nifcon LIKE '%' || :part || '%' OR nomcon LIKE '%' || :part || '%' OR ejefra LIKE '%' || :part || '%' OR liqfra LIKE '%' || LOWER(:part) || '%' OR destip LIKE '%' || :part || '%' OR desofi LIKE '%' || :part || '%' OR :part IS NULL)"
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.rest) {
    bind.rest = context.rest
    query += " AND (nifcon LIKE '%' || :rest || '%' OR nomcon LIKE '%' || :rest || '%' OR ejefra LIKE '%' || :rest || '%' OR liqfra LIKE '%' || LOWER(:rest) || '%' OR destip LIKE '%' || :rest || '%' OR desofi LIKE '%' || :rest || '%')"
  }
  if (context.direction === 'next') {
    bind.idfrau = context.cursor.next;
    query += ")SELECT * FROM datos WHERE idfrau > :idfrau ORDER BY idfrau ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idfrau = context.cursor.prev;
    query += ")SELECT * FROM datos WHERE idfrau < :idfrau ORDER BY idfrau DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insert = async (context) => {
  // bind
  let bind = context
  bind.idfrau = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  console.log(insertSql,bind);
  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.idfrau = ret.outBinds.idfrau
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const update = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const remove = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const change = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(cambioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const unasing = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(unasignSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const close = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(cierreSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// proc hitos
export const hito = async (context) => {
  // bind
  let query = hitosQuery
  let bind = context

  if (context.IDHITO) {
    query += " WHERE hh.idhito = :idhito"
  } else if (context.IDFRAU) {
    query += " INNER JOIN hitosfraude hf ON hf.idhito = hh.idhito WHERE hf.idfrau = :idfrau"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const hitos = async (context) => {
  // bind
  // TODO
  let query = "WITH datos AS (SELECT ff.idfrau,ff.fecfra,ff.ejefra,ff.nifcon,ff.nomcon,ff.obsfra,ff.liqfra,ff.stafra,oo.desofi,tf.destip FROM fraudes ff INNER JOIN oficinas oo ON oo.idofic = ff.ofifra INNER JOIN tiposfraude tf ON tf.idtipo = ff.tipfra"
  let bind = {
    liqfra: context.liquidador,
    stafra: context.estado,
    limit: context.limit,
    part: context.part,
  };

  //TODO
  if (context.oficina) {
    bind.ofifra = context.oficina
    query += " WHERE (ff.ofifra = :ofifra AND ff.stafra = 0) OR (ff.liqfra = :liqfra AND ff.stafra = :stafra) AND (ff.nifcon LIKE '%' || :part || '%' OR ff.nomcon LIKE '%' || :part || '%' OR ff.ejefra LIKE '%' || :part || '%' OR ff.fecfra LIKE '%' || :part || '%' OR tf.destip LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL))"
  } else {
    query += " WHERE (ff.liqfra = :liqfra AND ff.stafra = :stafra) AND (ff.nifcon LIKE '%' || :part || '%' OR ff.nomcon LIKE '%' || :part || '%' OR ff.ejefra LIKE '%' || :part || '%' OR ff.fecfra LIKE '%' || :part || '%' OR tf.destip LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL))"
  }  
  if (context.direction === 'next') {
    bind.idfrau = context.cursor.next;
    query += " SELECT * FROM datos WHERE idfrau > :idfrau ORDER BY idfrau ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idfrau = context.cursor.prev;
    query += " SELECT * FROM datos WHERE idfrau < :idfrau ORDER BY idfrau DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insertHito = async (context) => {
  // bind
  let bind = context
  bind.IDHITO = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertHitoSql, bind)

  if (ret) {
    bind.IDUSUA = ret.outBinds.IDUSUA
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const updateHito = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateHitoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const removeHito = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeHitoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insertHitoLiquidacion = async (context) => {
  // bind
  let bind = context
  bind.IDHITO = {
    dir: BIND_OUT,
    type: NUMBER,
  }
  
  // proc
  const ret = await simpleExecute(insertHitoLiquidacionSql, bind)

  if (ret) {
    bind.IDHITO = ret.outBinds.IDHITO
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insertHitoSancion = async (context) => {
  // bind
  let bind = context
  bind.IDHITO = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertHitoSancionSql, bind)

  if (ret) {
    bind.IDHITO = ret.outBinds.IDHITO
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const cambioEstadoHito = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(cambioEstadoHitoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// proc evento
export const evento = async (context) => {
  // bind
  let query = eventosQuery
  let bind = context

  if (context.IDEVEN) {
    query += " WHERE ee.ideven = :ideven"
  } else if (context.IDFRAU) {
    query += " INNER JOIN eventosfraude ef ON ef.ideven = ee.ideven WHERE ef.idfrau = :idfrau"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const eventos = async (context) => {
  // bind
  //TODO
  let query = "WITH datos AS (SELECT ff.idfrau,ff.fecfra,ff.ejefra,ff.nifcon,ff.nomcon,ff.obsfra,ff.liqfra,ff.stafra,oo.desofi,tf.destip FROM fraudes ff INNER JOIN oficinas oo ON oo.idofic = ff.ofifra INNER JOIN tiposfraude tf ON tf.idtipo = ff.tipfra"
  let bind = {
    liqfra: context.liquidador,
    stafra: context.estado,
    limit: context.limit,
    part: context.part,
  };

  if (context.oficina) {
    bind.ofifra = context.oficina
    query += " WHERE (ff.ofifra = :ofifra AND ff.stafra = 0) OR (ff.liqfra = :liqfra AND ff.stafra = :stafra) AND (ff.nifcon LIKE '%' || :part || '%' OR ff.nomcon LIKE '%' || :part || '%' OR ff.ejefra LIKE '%' || :part || '%' OR ff.fecfra LIKE '%' || :part || '%' OR tf.destip LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL))"
  } else {
    query += " WHERE (ff.liqfra = :liqfra AND ff.stafra = :stafra) AND (ff.nifcon LIKE '%' || :part || '%' OR ff.nomcon LIKE '%' || :part || '%' OR ff.ejefra LIKE '%' || :part || '%' OR ff.fecfra LIKE '%' || :part || '%' OR tf.destip LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL))"
  }  
  if (context.direction === 'next') {
    bind.idfrau = context.cursor.next;
    query += " SELECT * FROM datos WHERE idfrau > :idfrau ORDER BY idfrau ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idfrau = context.cursor.prev;
    query += " SELECT * FROM datos WHERE idfrau < :idfrau ORDER BY idfrau DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insertEvento = async (context) => {
  // bind
  let bind = context
  bind.ideven = {
    dir: BIND_OUT,
    type: NUMBER,
  }
  // proc
  const ret = await simpleExecute(insertEventoSql, bind)

  if (ret) {
    bind.ideven = ret.outBinds.IDEVEN
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const updateEvento = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateEventoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const removeEvento = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeEventoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
  
// proc sms
export const sms = async (context) => {
  // bind
  let query = smssQuery
  const bind = context

  if (context.IDFRAU) {
    query += " INNER JOIN smssfraude sf ON sf.idsmss = ss.idsmss WHERE sf.idfrau = :idfrau"
  } else if (context.IDSMSS) {
    query += " WHERE ss.idsmss = :idsmss"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const smss = async (context) => {
  // bind
  let query = ""
  let bind = {
    idfrau: context.fraude,
    limit: context.limit,
    part: context.part,
  };

  console.log(bind);
  if (context.direction === 'next') {
    bind.idsmss = context.cursor.next;
    query = "SELECT ss.*,sf.idfrau FROM smss ss INNER JOIN smssfraude sf ON sf.idsmss = ss.idsmss AND sf.idfrau = :idfrau WHERE ss.idsmss > :idsmss AND (ss.movsms LIKE '%' || :part OR ss.fecsms LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY ss.idsmss ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idsmss = context.cursor.prev;
    query = "SELECT ss.*,sf.idfrau FROM smss ss INNER JOIN smssfraude sf ON sf.idsmss = ss.idsmss AND sf.idfrau = :idfrau WHERE ss.idsmss < :idsmss AND (ss.movsms LIKE '%' || :part OR ss.fecsms LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY ss.idsmss DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insertSms = async (context) => {
  // bind
  let bind = context
  bind.IDSMSS = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertSmsSql, bind)

  if (ret) {
    bind.IDSMSS = ret.outBinds.IDSMSS
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const updateSms = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateSmsSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const removeSms = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeSmsSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// proc relacion
export const relacion = async (context) => {
  // bind
  let query = relacionesQuery
  const bind = context

  if (context.IDFRAU) {
    query += " INNER JOIN relacionesfraude rf ON rf.idrela = rr.idrela WHERE rf.idfrau = :idfrau"
  } 
  if (context.IDRELA) {
    query += " WHERE rr.idrela = :idrela"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const relaciones = async (context) => {
  // bind
  let query = ""
  let bind = {
    idfrau: context.fraude,
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idrela = context.cursor.next;
    query = "SELECT rr.*,rf.idfrau FROM relaciones rr INNER JOIN relacionesfraude rf ON rf.idrela = rr.idrela AND rf.idfrau = :idfrau WHERE rr.idrela > :idrela AND (rr.nifcon LIKE '%' || :part || '%' OR rr.nomcon LIKE '%' || :part OR rr.fecrel LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY rr.idrela ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idrela = context.cursor.prev;
    query = "SELECT rr.*,rf.idfrau FROM relaciones rr INNER JOIN relacionesfraude rf ON rf.idrela = rr.idrela AND rf.idfrau = :idfrau WHERE rr.idrela < :idrela AND (rr.nifcon LIKE '%' || :part || '%' OR rr.nomcon LIKE '%' || :part OR rr.fecrel LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY rr.idrela DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insertRelacion = async (context) => {
  // bind
  let bind = context
  bind.IDRELA = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertRelacionSql, bind)
  
  if (ret) {
    bind.IDRELA = ret.outBinds.IDRELA
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const updateRelacion = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateRelacionSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const removeRelacion = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeRelacionSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}