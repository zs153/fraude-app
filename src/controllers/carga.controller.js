import * as DAL from "../models/carga.model";

const insertFromRec = (req) => {
  const carga = {
    descar: req.body.carga.DESCAR,
    ficcar: req.body.carga.FICCAR,
    refcar: req.body.carga.REFCAR,
    stacar: req.body.carga.STACAR,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };

  return Object.assign(carga, movimiento);
};

// proc
export const carga = async (req, res) => {
  const context = req.body.carga;

  try {
    const result = await DAL.find(context);

    if (result.length === 1) {
      return res.status(200).json(result[0]);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const cargas = async (req, res) => {
  const context = req.body.carga

  try {
    const result = await DAL.find(context);

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const crear = async (req, res) => {
  try {
    const result = await DAL.insert(insertFromRec(req));

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
