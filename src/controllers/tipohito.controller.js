import * as DAL from "../models/tipohito.model";

const insertFromRec = (req) => {
  const tipo = {
    destip: req.body.tipo.DESTIP,
    anuhit: req.body.tipo.ANUHIT,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };

  return Object.assign(tipo, movimiento);
};
const updateFromRec = (req) => {
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
    destip: req.body.tipo.DESTIP,
    anuhit: req.body.tipo.ANUHIT,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };

  return Object.assign(tipo, movimiento);
};
const deleteFromRec = (req) => {
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };

  return Object.assign(tipo, movimiento);
};

export const tipo = async (req, res) => {
  const context = req.body.tipo;

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
export const tipos = async (req, res) => {
  const context = req.body;

  try {
    const result = await DAL.find(context);

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
