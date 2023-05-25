import { simpleExecute } from "../services/database.js";

const baseQuery = "SELECT * FROM tiposfraude";
const insertSql = "BEGIN FRAUDE_PKG.INSERTTIPOFRAUDE(:destip,:usumov,:tipmov,:idtipo); END;";
const updateSql = "BEGIN FRAUDE_PKG.UPDATETIPOFRAUDE(:idtipo,:destip,:usumov,:tipmov); END;";
const removeSql = "BEGIN FRAUDE_PKG.DELETETIPOFRAUDE(:idtipo,:usumov,:tipmov ); END;";

export const find = async (context) => {
  // bind
  let query = baseQuery;
  const bind = {};

  if (context.IDTIPO) {
    query += " WHERE idtipo = :idtipo";
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

  if (context.direction === 'next') {
    bind.idofic = context.cursor.next;
    query = "WITH datos AS (SELECT * FROM tiposFraude WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo > :idtipo ORDER BY idtipo ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idofic = context.cursor.prev;
    query = "WITH datos AS (SELECT * FROM tiposFraude WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo < :idtipo ORDER BY idtipo DESC FETCH NEXT :limit ROWS ONLY"
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
  bind.IDTIPO = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDTIPO = ret.outBinds.IDTIPO
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
