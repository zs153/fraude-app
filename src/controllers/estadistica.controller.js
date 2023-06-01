import * as DAL from '../models/estadistica.model'

export const contadores = async (req, res) => {
  // context
  const context = req.body.context
  // proc
  try {
    const result = await DAL.contadores(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const situacion = async (req, res) => {
  try {
    const result = await DAL.situacion(situacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const oficinas = async (req, res) => {
  // context
  const context = req.body.context
  // proc
  try {
    const result = await DAL.oficinas(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const actuacion = async (req, res) => {
  try {
    const result = await DAL.actuacion(actuacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}