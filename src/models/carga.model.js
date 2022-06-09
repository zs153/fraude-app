import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT cc.*,
  TO_CHAR(cc.feccar, 'DD/MM/YYYY') "STRFEC"
FROM cargas cc
`;
const insertSql = `BEGIN FRAUDE_PKG.INSERTCARGA(
  :descar,
  :ficcar,
  :stacar,
  :usumov,
  :tipmov,
  :idcarg
); END;
`;
const updateSql = `BEGIN FRAUDE_PKG.UPDATECARGA(
  :idcarg,
  :descar,
  :ficcar,
  :stacar,
  :usumov,
  :tipmov
); END;
`;
const removeSql = `BEGIN FRAUDE_PKG.DELETECARGA(
  :idcarg,
  :usumov,
  :tipmov 
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idcarg) {
    binds.idcarg = context.idcarg;
    query += `WHERE idcarg = :idcarg`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findAll = async () => {
  let query = baseQuery;

  const result = await simpleExecute(query);
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
export const update = async (bind) => {
  let result;

  try {
    await simpleExecute(updateSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const remove = async (bind) => {
  let result;

  try {
    await simpleExecute(removeSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
