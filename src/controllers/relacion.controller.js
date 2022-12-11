import * as DAL from '../models/relacion.model'

const insertFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const relacion = {
    desofi: req.body.relacion.DESOFI,
    codofi: req.body.relacion.CODOFI,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, relacion, movimiento)
}
const updateFromRec = (req) => {
  const relacion = {
    idofic: req.body.relacion.IDOFIC,
    desofi: req.body.relacion.DESOFI,
    codofi: req.body.relacion.CODOFI,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(relacion, movimiento)
}
const deleteFromRec = (req) => {
  const relacion = {
    idofic: req.body.relacion.IDOFIC,
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
export const relacions = async (req, res) => {
  const context = req.body

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
