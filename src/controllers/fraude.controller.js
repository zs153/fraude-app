import * as DAL from '../models/fraude.model'

const insertFromRec = (req) => {
  const fraude = {
    fecfra: req.body.fraude.fecfra,
    nifcon: req.body.fraude.nifcon,
    nomcon: req.body.fraude.nomcon,
    emacon: req.body.fraude.emacon,
    telcon: req.body.fraude.telcon,
    movcon: req.body.fraude.movcon,
    reffra: req.body.fraude.reffra,
    tipfra: req.body.fraude.tipfra,
    ejefra: req.body.fraude.ejefra,
    ofifra: req.body.fraude.ofifra,
    obsfra: req.body.fraude.obsfra,
    funfra: req.body.fraude.funfra,
    liqfra: req.body.fraude.liqfra,
    stafra: req.body.fraude.stafra,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
}
const updateFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
    fecfra: req.body.fraude.fecfra,
    nifcon: req.body.fraude.nifcon,
    nomcon: req.body.fraude.nomcon,
    emacon: req.body.fraude.emacon,
    telcon: req.body.fraude.telcon,
    movcon: req.body.fraude.movcon,
    tipfra: req.body.fraude.tipfra,
    ejefra: req.body.fraude.ejefra,
    ofifra: req.body.fraude.ofifra,
    obsfra: req.body.fraude.obsfra,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
}
const deleteFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
}
const cambioFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
    liqfra: req.body.fraude.liqfra,
    stafra: req.body.fraude.stafra,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
}
const unasignFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
    liqfra: req.body.fraude.liqfra,
    stafra: req.body.fraude.stafra,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
}
const cierreFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
    liqfra: req.body.fraude.liqfra,
    stafra: req.body.fraude.stafra,
  }
  const cierre = {
    sitcie: req.body.cierre.sitcie
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, cierre, movimiento)
}
const estadisticaFromRec = (req) => {
  const periodo = {
    desfec: req.body.periodo.desde,
    hasfec: req.body.periodo.hasta,
  }
  const fraude = {
    tipfra: req.body.fraude.tipfra,
    fecfra: req.body.fraude.fecfra,
  }

  return Object.assign(periodo, fraude)
}
const cargaFromRec = (req) => {
  const fraude = {
    tipfra: req.body.fraude.tipfra,
    fecfra: req.body.fraude.fecfra,
  }

  return fraude
}
const smsFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
  const sms = {
    texsms: req.body.sms.texsms,
    movsms: req.body.sms.movsms,
    stasms: req.body.sms.stasms,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, sms, movimiento)
}
const insertHitoFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
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

  return Object.assign(fraude, hito, movimiento)
}
const insertHitoLiqFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
  const hito = {
    tiphit: req.body.hito.tiphit,
    imphit: req.body.hito.imphit,
    obshit: req.body.hito.obshit,
    stahit: req.body.hito.stahit,
  }
  const liquidacion = {
    tipliq: req.body.liquidacion.tipliq,
    impliq: req.body.liquidacion.impliq,
    obsliq: req.body.liquidacion.obsliq,
    staliq: req.body.liquidacion.staliq,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, hito, liquidacion, movimiento)
}
const insertHitoSanFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
  const hito = {
    tiphit: req.body.hito.tiphit,
    imphit: req.body.hito.imphit,
    obshit: req.body.hito.obshit,
    stahit: req.body.hito.stahit,
  }
  const sancion = {
    tipsan: req.body.sancion.tipsan,
    impsan: req.body.sancion.impsan,
    obssan: req.body.sancion.obssan,
    stasan: req.body.sancion.stasan,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, hito, sancion, movimiento)
}
const insertEventoFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
  const evento = {
    tipeve: req.body.evento.tipeve,
    obseve: req.body.evento.obseve,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, evento, movimiento)
}

// fraude
export const fraude = async (req, res) => {
  const context = req.body.fraude

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
export const fraudes = async (req, res) => {
  const context = req.body.fraude

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
export const unasign = async (req, res) => {
  try {
    const result = await DAL.unasing(unasignFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const cierre = async (req, res) => {
  try {
    const result = await DAL.cierre(cierreFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const estadisticasHitos = async (req, res) => {
  try {
    const result = await DAL.statHitos(estadisticaFromRec(req))

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
    const result = await DAL.statOficinas(cargaFromRec(req))

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
    const result = await DAL.statSituacion(estadisticaFromRec(req))

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
    const result = await DAL.statActuacion(estadisticaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearSms = async (req, res) => {
  try {
    const result = await DAL.insertSms(smsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(403).end()
  }
}

// hitos
export const hitosFraude = async (req, res) => {
  const context = req.body.fraude

  try {
    const result = await DAL.findHitosFraude(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearHito = async (req, res) => {
  try {
    const result = await DAL.insertHito(insertHitoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearHitoLiquidacion = async (req, res) => {
  try {
    const result = await DAL.insertHitoLiquidacion(insertHitoLiqFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearHitoSancion = async (req, res) => {
  try {
    const result = await DAL.insertHitoSancion(insertHitoSanFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// eventos
export const eventosFraude = async (req, res) => {
  const context = req.body.fraude

  try {
    const result = await DAL.findEventosFraude(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearEvento = async (req, res) => {
  try {
    const result = await DAL.insertEvento(insertEventoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
