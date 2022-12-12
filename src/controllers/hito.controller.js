import * as DAL from '../models/hito.model'

const insertFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const hito = {
    tiphit: req.body.hito.TIPHIT,
    imphit: req.body.hito.IMPHIT,
    obshit: req.body.hito.OBSHIT,
    stahit: req.body.hito.STAHIT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, hito, movimiento)
}
const updateFromRec = (req) => {
  const hito = {
    idhito: req.body.hito.IDHITO,
    tiphit: req.body.hito.TIPHIT,
    imphit: req.body.hito.IMPHIT,
    obshit: req.body.hito.OBSHIT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(hito, movimiento)
}
const deleteFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const hito = {
    idhito: req.body.hito.IDHITO,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, hito, movimiento)
}
const cambioFromRec = (req) => {
  const hito = {
    idhito: req.body.hito.IDHITO,
    stahit: req.body.hito.STAHIT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
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
  const context = req.body.fraude

  try {
    const result = await DAL.find(context)

    res.status(200).json(result)
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
