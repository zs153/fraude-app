import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseCierreQuery = "SELECT * FROM tiposcierre";
const insertCierreSql = "BEGIN FRAUDE_PKG.INSERTTIPOCIERRE(:destip,:usumov,:tipmov,:idtipo); END;";
const updateCierreSql = "BEGIN FRAUDE_PKG.UPDATETIPOCIERRE(:idtipo,:destip,:usumov,:tipmov); END;";
const removeCierreSql = "BEGIN FRAUDE_PKG.DELETETIPOCIERRE(:idtipo,:usumov,:tipmov ); END;";

const baseEventoQuery = "SELECT * FROM tiposevento";
const insertEventoSql = "BEGIN FRAUDE_PKG.INSERTTIPOEVENTO(:destip,:usumov,:tipmov,:idtipo); END;";
const updateEventoSql = "BEGIN FRAUDE_PKG.UPDATETIPOEVENTO(:idtipo,:destip,:usumov,:tipmov); END;";
const removeEventoSql = "BEGIN FRAUDE_PKG.DELETETIPOEVENTO(:idtipo,:usumov,:tipmov ); END;";

const baseFraudeQuery = "SELECT * FROM tiposfraude";
const insertFraudeSql = "BEGIN FRAUDE_PKG.INSERTTIPOFRAUDE(:destip,:usumov,:tipmov,:idtipo); END;";
const updateFraudeSql = "BEGIN FRAUDE_PKG.UPDATETIPOFRAUDE(:idtipo,:destip,:usumov,:tipmov); END;";
const removeFraudeSql = "BEGIN FRAUDE_PKG.DELETETIPOFRAUDE(:idtipo,:usumov,:tipmov ); END;";

const baseHitoQuery = "SELECT * FROM tiposhito";
const insertHitoSql = "BEGIN FRAUDE_PKG.INSERTTIPOHITO(:destip,:usumov,:tipmov,:idtipo); END;";
const updateHitoSql = "BEGIN FRAUDE_PKG.UPDATETIPOHITO(:idtipo,:destip,:usumov,:tipmov); END;";
const removeHitoSql = "BEGIN FRAUDE_PKG.DELETETIPOHITO(:idtipo,:usumov,:tipmov ); END;";

export const cierre = async (context) => {
  // bind
  let query = baseCierreQuery;
  const bind = context;

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
export const cierres = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idtipo = context.cursor.next;
    query = "WITH datos AS (SELECT * FROM tiposcierre WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo > :idtipo ORDER BY idtipo ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idtipo = context.cursor.prev;
    query = "WITH datos AS (SELECT * FROM tiposcierre WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo < :idtipo ORDER BY idtipo DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insertCierre = async (context) => {
  // bind
  let bind = context
  bind.IDTIPO = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertCierreSql, bind)

  if (ret) {
    bind.IDTIPO = ret.outBinds.IDTIPO
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const updateCierre = async (context) => {
  // bind
  const bind = context

  // proc
  const ret = await simpleExecute(updateCierreSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const removeCierre = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeCierreSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};

export const evento = async (context) => {
  // bind
  let query = baseEventoQuery;
  const bind = context;

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
export const eventos = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idtipo = context.cursor.next;
    query = "WITH datos AS (SELECT * FROM tiposevento WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo > :idtipo ORDER BY idtipo ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idtipo = context.cursor.prev;
    query = "WITH datos AS (SELECT * FROM tiposevento WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo < :idtipo ORDER BY idtipo DESC FETCH NEXT :limit ROWS ONLY"
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
  bind.IDTIPO = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertEventoSql, bind)

  if (ret) {
    bind.IDTIPO = ret.outBinds.IDTIPO
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
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
};
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
};

export const fraude = async (context) => {
  // bind
  let query = baseFraudeQuery;
  const bind = context;

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
export const fraudes = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idtipo = context.cursor.next;
    query = "WITH datos AS (SELECT * FROM tiposfraude WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo > :idtipo ORDER BY idtipo ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idtipo = context.cursor.prev;
    query = "WITH datos AS (SELECT * FROM tiposfraude WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo < :idtipo ORDER BY idtipo DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insertFraude = async (context) => {
  // bind
  let bind = context
  bind.IDTIPO = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertFraudeSql, bind)

  if (ret) {
    bind.IDTIPO = ret.outBinds.IDTIPO
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const updateFraude = async (context) => {
  // bind
  const bind = context

  // proc
  const ret = await simpleExecute(updateFraudeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const removeFraude = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeFraudeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};

export const hito = async (context) => {
  // bind
  let query = baseHitoQuery;
  const bind = context;

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
export const hitos = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idtipo = context.cursor.next;
    query = "WITH datos AS (SELECT * FROM tiposhito WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo > :idtipo ORDER BY idtipo ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idtipo = context.cursor.prev;
    query = "WITH datos AS (SELECT * FROM tiposhito WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo < :idtipo ORDER BY idtipo DESC FETCH NEXT :limit ROWS ONLY"
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
  bind.IDTIPO = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertHitoSql, bind)

  if (ret) {
    bind.IDTIPO = ret.outBinds.IDTIPO
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
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
};
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
};
