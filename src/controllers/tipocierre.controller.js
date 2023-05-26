import * as DAL from "../models/tipocierre.model";

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
    destip: req.body.tipo.DESTIP,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
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
    idtipo: req.body.tipo.IDTIPO,
    destip: req.body.tipo.DESTIP,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
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
    idtipo: req.body.tipo.IDTIPO,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
