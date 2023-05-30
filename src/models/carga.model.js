import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = "SELECT * FROM cargas"
const insertSql = "BEGIN FRAUDE_PKG.INSERTCARGA(:descar,:ficcar,:refcar,:stacar,:usumov,:tipmov,:idcarg); END;";

export const carga = async (context) => {
  // bind
  let query = baseQuery
  const bind = context

  if (context.IDCARG) {
    query += " WHERE idcarg = :idcarg"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const cargas = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idcarg = context.cursor.next;
    query = "WITH datos AS (SELECT * FROM cargas WHERE descar LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idcarg > :idcarg ORDER BY idcarg ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idcarg = context.cursor.prev;
    query = "WITH datos AS (SELECT * FROM cargas WHERE descar LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idcarg < :idcarg ORDER BY idcarg DESC FETCH NEXT :limit ROWS ONLY"
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
  bind.idcarg = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDOFIC = ret.outBinds.IDOFIC
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};