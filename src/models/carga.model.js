import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  *,
  TO_CHAR(feccar, 'DD/MM/YYYY') "STRFEC"
FROM cargas
`;
const insertSql = `BEGIN FRAUDES_PKG.INSERTCARGA(
  :descar,
  :ficcar,
  :refcar,
  :stacar,
  :usumov,
  :tipmov,
  :idcarg
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.IDCARG) {
    binds.idcarg = context.IDCARG
    query += `WHERE idcarg = :idcarg`
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const insert = async (bind) => {
  bind.idcarg = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idcarg = await result.outBinds.idcarg;
  } catch (error) {
    bind = null;
  }

  return bind;
};
