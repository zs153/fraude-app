import * as DAL from '../models/sms.model'

const insertFromRec = (req) => {
  const sms = {
    fecsms: req.body.sms.FECSMS,
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
    stasms: req.body.sms.STASMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(sms, movimiento)
}
const updateFromRec = (req) => {
  const sms = {
    idsmss: req.body.sms.IDSMSS,
    fecsms: req.body.sms.FECSMS,
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(sms, movimiento)
}
const deleteFromRec = (req) => {
  const sms = {
    idsmss: req.body.sms.IDSMSS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(sms, movimiento)
}
const cambioFromRec = (req) => {
  const sms = {
    idsmss: req.body.sms.IDSMSS,
    stasms: req.body.sms.STASMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(sms, movimiento)
}

export const sms = async (req, res) => {
  const context = req.body.sms

  try {
    const rows = await DAL.find(context)

    if (rows.length === 1) {
      return res.status(200).json(rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const smss = async (req, res) => {
  const context = req.body.sms

  try {
    const result = await DAL.find(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).end()
  }
}

export const crear = async (req, res) => {
  try {
    const result = await DAL.insert(insertFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificar = async (req, res) => {
  try {
    const result = await DAL.update(updateFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrar = async (req, res) => {
  try {
    const result = await DAL.remove(deleteFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const cambioEstado = async (req, res) => {
  try {
    const result = await DAL.change(cambioFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
