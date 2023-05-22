import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = "SELECT uu.*,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu";
const insertSql = "BEGIN FRAUDE_PKG.INSERTUSUARIO(:nomusu,:ofiusu,:rolusu,:userid,:emausu,:perusu,:telusu,:stausu,:usumov,:tipmov,:idusua); END;";
const updateSql = "BEGIN FRAUDE_PKG.UPDATEUSUARIO(:idusua,:nomusu,:ofiusu,:rolusu,:emausu,:perusu,:telusu,:stausu,:usumov,:tipmov); END;";
const removeSql = "BEGIN FRAUDE_PKG.DELETEUSUARIO(:idusua,:usumov,:tipmov); END;";
const perfilSql = "BEGIN FRAUDE_PKG.UPDATEPERFILUSUARIO(:idusua,:nomusu,:emausu,:telusu, :usumov,:tipmov); END;";

export const find = async (context) => {
  // bind
  let query = baseQuery;
  const bind = context

  if (context.IDUSUA) {
    query += " WHERE uu.idusua = :idusua";
  } else if (context.USERID) {
    query += " WHERE uu.userid = :userid";
  } else if (context.EMAUSU) {
    query += " WHERE uu.emausu = :emausu";
  } else if (context.OFIUSU) {
    query += " WHERE uu.ofiusu = :ofiusu";
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const findAll = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.oficina) {
    bind.ofiusu = context.oficina
    query = "WITH datos AS (SELECT uu.idusua,uu.userid,uu.nomusu,uu.telusu,uu.stausu,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu WHERE uu.ofiusu = :ofiusu AND (uu.nomusu LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL))"
  } else {
    query = "WITH datos AS (SELECT uu.idusua,uu.userid,uu.nomusu,uu.telusu,uu.stausu,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu WHERE uu.nomusu LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL)"
  }

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query += "SELECT * FROM datos WHERE nomusu > :nomusu OR :nomusu IS NULL ORDER BY nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query += "SELECT * FROM datos WHERE nomusu < :nomusu OR :nomusu IS NULL ORDER BY nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insert = async (context) => {
  // bind
  let bind = context
  bind.IDUSUA = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDUSUA = ret.outBinds.IDUSUA
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
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
};
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
};
export const profile = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(perfilSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}