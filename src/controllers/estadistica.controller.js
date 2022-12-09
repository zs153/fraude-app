import * as DAL from '../models/estadistica.model'

const situacionFromRec = (req) => {
  const fraude = {
    reffra: req.body.fraude.REFFRA,
  }

  return Object.assign(fraude)
}
const oficinasFromRec = (req) => {
  const carga = {
    refcar: req.body.carga.REFCAR,
  }

  return carga
}
const actuacionFromRec = (req) => {
  const periodo = {
    desfec: req.body.periodo.DESDE,
    hasfec: req.body.periodo.HASTA,
  }
  const fraude = {
    refdoc: req.body.fraude.REFFRA,
  }
  const tipos = {
    tipoAsign: req.body.tiposMovimiento.asignarfraude,
    tipoResol: req.body.tiposMovimiento.resolverfraude,
  }
  return Object.assign(periodo, fraude, tipos)
}

export const estadisticasSituacion = async (req, res) => {
  try {
    const result = await DAL.statSituacion(situacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const estadisticasOficinas = async (req, res) => {
  try {
    const result = await DAL.statOficinas(oficinasFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const estadisticasActuacion = async (req, res) => {
  try {
    const result = await DAL.statActuacion(actuacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}