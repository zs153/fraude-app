import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  nifgen,
  nomgen,
  disgen
FROM gentes
WHERE nifgen = :nifgen
`;
export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  binds.nifgen = context.nifgen;
  if (context.disgen) {
    binds.disgen = context.disgen;
    query += `AND disgen = :disgen`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
