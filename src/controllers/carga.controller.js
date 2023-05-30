import * as DAL from "../models/carga.model";

// proc
export const carga = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.carga(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const cargas = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.cargas(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

export const crear = async (req, res) => {
  // context
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

  const context = Object.assign(carga, movimiento);

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
