import * as DAL from '../models/historico.model'

export const historico = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.historico(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const historicos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.historicos(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificar = async (req, res) => {
  // context
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
    NOMUSU: req.body.usuario.NOMUSU,
    OFIUSU: req.body.usuario.OFIUSU,
    ROLUSU: req.body.usuario.ROLUSU,
    USERID: req.body.usuario.USERID,
    EMAUSU: req.body.usuario.EMAUSU,
    PERUSU: req.body.usuario.PERUSU,
    TELUSU: req.body.usuario.TELUSU,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(usuario, movimiento)

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
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(usuario, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const activar = async (req, res) => {
  // context
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(usuario, movimiento)

  // proc
  try {
    const result = await DAL.activar(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}