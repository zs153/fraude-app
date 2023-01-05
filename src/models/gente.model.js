import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  gg.*
FROM gentes gg
WHERE gg.nifgen = :nifgen
`;
export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  binds.nifgen = context.nifgen;
  if (context.disgen) {
    binds.disgen = context.disgen;
    query += `AND gg.disgen = :disgen`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
