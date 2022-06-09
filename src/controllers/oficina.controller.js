import * as DAL from '../models/oficina.model'

const insertFromRec = (req) => {
  const oficina = {
    desofi: req.body.oficina.desofi,
    codofi: req.body.oficina.codofi,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(oficina, movimiento)
}
const updateFromRec = (req) => {
  const oficina = {
    idofic: req.body.oficina.idofic,
    desofi: req.body.oficina.desofi,
    codofi: req.body.oficina.codofi,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(oficina, movimiento)
}
const deleteFromRec = (req) => {
  const oficina = {
    idofic: req.body.oficina.idofic,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(oficina, movimiento)
}

export const oficina = async (req, res) => {
  const context = req.body.oficina

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
export const oficinas = async (req, res) => {
  const context = req.body.oficina

  try {
    const result = await DAL.findAll(context)

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
