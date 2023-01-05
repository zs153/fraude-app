import * as DAL from '../models/evento.model'

const insertFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const evento = {
    feceve: req.body.evento.FECEVE,
    tipeve: req.body.evento.TIPEVE,
    obseve: req.body.evento.OBSEVE,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, evento, movimiento)
}
const updateFromRec = (req) => {
  const evento = {
    ideven: req.body.evento.IDEVEN,
    feceve: req.body.evento.FECEVE,
    tipeve: req.body.evento.TIPEVE,
    obseve: req.body.evento.OBSEVE,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(evento, movimiento)
}
const deleteFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const evento = {
    ideven: req.body.evento.IDEVEN,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, evento, movimiento)
}

export const evento = async (req, res) => {
  const context = req.body.evento

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
export const eventos = async (req, res) => {
  const context = req.body.fraude

  try {
    const result = await DAL.find(context)

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
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
