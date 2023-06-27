import { simpleExecute } from "../services/database.js";

export const find = async (context) => {
  let query = "SELECT gg.* FROM gentes gg WHERE gg.nifgen = :nifgen";
  let binds = {};

  binds.nifgen = context.nifgen;
  if (context.disgen) {
    binds.disgen = context.disgen;
    query += `AND gg.disgen = :disgen`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
