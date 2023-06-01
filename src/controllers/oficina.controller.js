import * as DAL from '../models/oficina.model'

export const oficina = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.oficina(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const oficinas = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.oficinas(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

export const crear = async (req, res) => {
  // context
  const oficina = {
    DESOFI: req.body.oficina.DESOFI,
    CODOFI: req.body.oficina.CODOFI,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(oficina, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificar = async (req, res) => {
  // context
  const oficina = {
    IDOFIC: req.body.oficina.IDOFIC,
    DESOFI: req.body.oficina.DESOFI,
    CODOFI: req.body.oficina.CODOFI,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(oficina, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrar = async (req, res) => {
  // context
  const oficina = {
    IDOFIC: req.body.oficina.IDOFIC,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(oficina, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}