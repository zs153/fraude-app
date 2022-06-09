import * as DAL from "../models/carga.model";

const insertFromRec = (req) => {
  const carga = {
    descar: req.body.carga.descar,
    ficcar: req.body.carga.ficcar,
    stacar: req.body.carga.stacar,
  };
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return Object.assign(carga, movimiento);
};
const updateFromRec = (req) => {
  const carga = {
    idcarg: req.body.carga.idcarg,
    descar: req.body.carga.descar,
    ficcar: req.body.carga.ficcar,
    stacar: req.body.carga.stacar,
  };
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return Object.assign(carga, movimiento);
};
const deleteFromRec = (req) => {
  const carga = {
    idcarg: req.body.carga.idcarg,
  };
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return Object.assign(carga, movimiento);
};

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
  try {
    const result = await DAL.findAll();

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
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
export const modificar = async (req, res) => {
  try {
    const result = await DAL.update(updateFromRec(req));

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const borrar = async (req, res) => {
  try {
    const result = await DAL.remove(deleteFromRec(req));

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
