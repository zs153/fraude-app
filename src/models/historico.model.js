import { simpleExecute } from "../services/database.js";

const baseQuery = "SELECT * FROM historicos"
const updateSql = "BEGIN FRAUDE_PKG.UPDATEHISTORICO(:idusua,:nomusu,:ofiusu,:rolusu,:userid,:emausu,:perusu,:telusu,:usumov,:tipmov); END;";
const removeSql = "BEGIN FRAUDE_PKG.DELETEHISTORICO(:idusua,:usumov,:tipmov); END;";
const activarSql = "BEGIN FRAUDE_PKG.ACTIVARHISTORICO(:idusua,:usumov,:tipmov); END;"

export const historico = async (context) => {
  // bind
  let query = baseQuery;
  let bind = context;

  if (context.IDUSUA) {
    query += " WHERE idusua = :idusua";
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const historicos = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query = "WITH datos AS (SELECT idusua,nomusu,userid FROM historicos WHERE nomusu LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE nomusu > :nomusu OR :nomusu IS NULL ORDER BY nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query = "WITH datos AS (SELECT idusua,nomusu,userid FROM historicos WHERE nomusu LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE nomusu < :nomusu OR :nomusu IS NULL ORDER BY nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
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
    return ({ stat: null, data: [] })
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
export const activar = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(activarSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}