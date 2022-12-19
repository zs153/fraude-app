import * as DAL from '../models/estadistica.model'

const situacionActuacionFromRec = (req) => {
  const fraude = {
    reffra: req.body.fraude.REFFRA,
  }
  const periodo = {
    desde: req.body.periodo.DESDE,
    hasta: req.body.periodo.HASTA,
  }
  const tipos = {
    cruerr: req.body.tipos[0].IDTIPO,
    sinefe: req.body.tipos[1].IDTIPO,
    tricor: req.body.tipos[2].IDTIPO,
    prescr: req.body.tipos[3].IDTIPO,
  }

  return Object.assign(fraude, periodo, tipos)
}
const situacionFromRec = (req) => {
  const fraude = {
    reffra: req.body.fraude.REFFRA,
  }
  const periodo = {
    desde: req.body.periodo.DESDE,
    hasta: req.body.periodo.HASTA,
  }
  const tipos = {
    cruerr: req.body.tipos[0].IDTIPO,
    sinefe: req.body.tipos[1].IDTIPO,
    tricor: req.body.tipos[2].IDTIPO,
    prescr: req.body.tipos[3].IDTIPO,
  }

  return Object.assign(fraude, periodo, tipos)
}
const oficinasFromRec = (req) => {
  const fraude = {
    reffra: req.body.fraude.REFFRA,
  }

  return fraude
}
const actuacionFromRec = (req) => {
  const fraude = {
    reffra: req.body.fraude.REFFRA,
  }
  const periodo = {
    desde: req.body.periodo.DESDE,
    hasta: req.body.periodo.HASTA,
  }

  return Object.assign(fraude, periodo)
}

export const situacionActuacion = async (req, res) => {
  try {
    const result = await DAL.sitAct(situacionActuacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
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