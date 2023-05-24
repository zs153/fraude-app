import * as DAL from "../models/tipofraude.model";

const insertFromRec = (req) => {
  const tipo = {
    destip: req.body.tipo.DESTIP,
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
  const context = req.body.context;

  try {
    const result = await DAL.find(context);

    res.status(200).json(result)
  } catch (err) {
    res.status(500).end();
  }
};
export const tipos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findAll(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crear = async (req, res) => {
  // context
  const tipo = {
    DESTIP: req.body.tipo.DESTIP,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const modificar = async (req, res) => {
  // context
  const tipo = {
    IDTIPO: req.body.tipo.IDTIPO,
    DESOFI: req.body.tipo.DESTIP,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const borrar = async (req, res) => {
  // context
  const tipo = {
    IDTIPO: req.body.tipo.IDTIPO,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
