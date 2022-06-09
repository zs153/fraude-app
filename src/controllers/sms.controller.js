import * as DAL from '../models/sms.model'

const insertFromRec = (req) => {
  const sms = {
    texsms: req.body.sms.texsms,
    movsms: req.body.sms.movsms,
    stasms: req.body.sms.stasms,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, movimiento)
}
const updateFromRec = (req) => {
  const sms = {
    idsmss: req.body.sms.idsmss,
    texsms: req.body.sms.texsms,
    movsms: req.body.sms.movsms,
    stasms: req.body.sms.stasms,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, movimiento)
}
const deleteFromRec = (req) => {  
  const sms = {
    idsmss: req.body.sms.idsmss,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, movimiento)
}
const cambioFromRec = (req) => {
  const sms = {
    idsmss: req.body.documento.idsmss,
    stasms: req.body.documento.stasms,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
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
    const result = await DAL.findAll(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).end()
  }
}
export const smsByMovil = async (req, res) => {
  try {
    const context = {}
    context.movsms = req.body.movsms

    const rows = await DAL.findByMovil(context)

    if (rows.length === 1) {
      return res.status(200).json(rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
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
