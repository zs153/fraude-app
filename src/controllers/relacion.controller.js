import * as DAL from '../models/relacion.model'

const insertFromRec = (req) => {
  const relacion = {
    fecrel: req.body.relacion.FECREL,
    nifcon: req.body.relacion.NIFCON,
    nomcon: req.body.relacion.NOMCON,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(relacion, movimiento)
}
const updateFromRec = (req) => {
  const relacion = {
    idrela: req.body.relacion.IDRELA,
    fecrel: req.body.relacion.FECREL,
    nifcon: req.body.relacion.NIFCON,
    nomcon: req.body.relacion.NOMCON,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(relacion, movimiento)
}
const deleteFromRec = (req) => {
  const relacion = {
    idrela: req.body.relacion.IDRELA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(relacion, movimiento)
}

export const relacion = async (req, res) => {
  const context = req.body.relacion

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
export const relaciones = async (req, res) => {
  const context = req.body.relacion

  try {
    const result = await DAL.find(context)

    if (result !== null) {
      res.status(200).json(result)
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
