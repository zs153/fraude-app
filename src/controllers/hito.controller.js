import * as DAL from '../models/hito.model'

const insertFromRec = (req) => {
  const hito = {
    tiphit: req.body.hito.tiphit,
    imphit: req.body.hito.imphit,
    obshit: req.body.hito.obshit,
    stahit: req.body.hito.stahit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(hito, movimiento)
}
const updateFromRec = (req) => {
  const hito = {
    idhito: req.body.hito.idhito,
    tiphit: req.body.hito.tiphit,
    imphit: req.body.hito.imphit,
    obshit: req.body.hito.obshit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(hito, movimiento)
}
const deleteFromRec = (req) => {
  const hito = {
    idhito: req.body.hito.idhito,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(hito, movimiento)
}
const cambioFromRec = (req) => {
  const hito = {
    idhito: req.body.hito.idhito,
    stahit: req.body.hito.stahit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(hito, movimiento)
}

export const hito = async (req, res) => {
  const context = req.body.hito

  try {
    const result = await DAL.find(context)

    if (result.length === 1) {
      return res.status(200).json(result[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const hitos = async (req, res) => {
  const context = req.body.hitos

  try {
    const result = await DAL.findAll(context)

    if (rows !== null) {
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
