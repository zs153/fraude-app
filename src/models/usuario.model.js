import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
    idusua,
    nomusu,
    ofiusu,
    rolusu,
    userid,
    emausu,
    perusu,
    telusu,
    pwdusu,
    stausu
  FROM usuarios
`;
const largeQuery = `SELECT 
    uu.idusua,
    uu.nomusu,
    uu.userid,
    uu.telusu,
    uu.stausu,
    oo.desofi
  FROM usuarios uu
  INNER JOIN oficinas oo ON oo.idofic = ofiusu
`;
const insertSql = `BEGIN FRAUDE_PKG.INSERTUSUARIO(
    :nomusu,
    :ofiusu,
    :rolusu,
    :userid,
    :emausu,
    :perusu,
    :telusu,
    :pwdusu,
    :stausu,
    :usumov,
    :tipmov,
    :idusua
  ); END;
`;
const updateSql = `BEGIN FRAUDE_PKG.UPDATEUSUARIO(
    :idusua,
    :nomusu, 
    :ofiusu, 
    :rolusu, 
    :userid, 
    :emausu, 
    :perusu, 
    :telusu, 
    :stausu, 
    :usumov, 
    :tipmov
  ); END;
`;
const removeSql = `BEGIN FRAUDE_PKG.DELETEUSUARIO(
  :idusua,
  :usumov,
  :tipmov 
); END;
`;
const registroSql = `BEGIN FRAUDE_PKG.REGISTROUSUARIO(
  :nomusu, 
  :ofiusu, 
  :rolusu, 
  :userid, 
  :emausu, 
  :perusu, 
  :telusu, 
  :pwdusu, 
  :stausu, 
  :tipmov,
  :saltus, 
  :idusua
); END;
`;
const cambioSql = `BEGIN FRAUDE_PKG.CHANGEPASSWORD(
  :idusua,
  :pwdusu, 
  :usumov,
  :tipmov
); END;
`;
const olvidoSql = `BEGIN FRAUDE_PKG.FORGOTPASSWORD(
  :emausu,
  :pwdusu, 
  :tipmov,
  :saltus
); END;
`;
const perfilSql = `BEGIN FRAUDE_PKG.UPDATEPERFILUSUARIO(
  :idusua,
  :nomusu,
  :ofiusu,
  :emausu,
  :telusu, 
  :usumov,
  :tipmov
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idusua) {
    binds.idusua = context.idusua;
    query += "WHERE idusua = :idusua";
  }
  if (context.userid) {
    binds.userid = context.userid;
    query += "WHERE userid = :userid";
  }
  if (context.emausu) {
    binds.emausu = context.emausu;
    query += "WHERE emausu = :emausu";
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findAll = async (context) => {
  let query = largeQuery;
  let binds = {}

  if (context.ofiusu) {
    binds.ofiusu = context.ofiusu;
    query += "WHERE ofiusu = :ofiusu";
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};

export const insert = async (bind) => {
  bind.idusua = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idusua = await result.outBinds.idusua;
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
export const register = async (bind) => {
  bind.idusua = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };
  try {
    const result = await simpleExecute(registroSql, bind);

    bind.idusua = await result.outBinds.idusua;
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const change = async (bind) => {
  let result;

  try {
    await simpleExecute(cambioSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const forgot = async (bind) => {
  let result;

  try {
    await simpleExecute(olvidoSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const profile = async (bind) => {
  let result;

  try {
    await simpleExecute(perfilSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
