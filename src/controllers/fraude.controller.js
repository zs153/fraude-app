import * as DAL from '../models/fraude.model'

// fraudes
const insertFromRec = (req) => {
  const fraude = {
    fecfra: req.body.fraude.FECFRA,
    nifcon: req.body.fraude.NIFCON,
    nomcon: req.body.fraude.NOMCON,
    emacon: req.body.fraude.EMACON,
    telcon: req.body.fraude.TELCON,
    movcon: req.body.fraude.MOVCON,
    reffra: req.body.fraude.REFFRA,
    tipfra: req.body.fraude.TIPFRA,
    ejefra: req.body.fraude.EJEFRA,
    ofifra: req.body.fraude.OFIFRA,
    obsfra: req.body.fraude.OBSFRA,
    funfra: req.body.fraude.FUNFRA,
    liqfra: req.body.fraude.LIQFRA,
    stafra: req.body.fraude.STAFRA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, movimiento)
}
const updateFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
    fecfra: req.body.fraude.FECFRA,
    nifcon: req.body.fraude.NIFCON,
    nomcon: req.body.fraude.NOMCON,
    emacon: req.body.fraude.EMACON,
    telcon: req.body.fraude.TELCON,
    movcon: req.body.fraude.MOVCON,
    tipfra: req.body.fraude.TIPFRA,
    ejefra: req.body.fraude.EJEFRA,
    ofifra: req.body.fraude.OFIFRA,
    obsfra: req.body.fraude.OBSFRA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, movimiento)
}
const deleteFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, movimiento)
}
const asignFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
    liqfra: req.body.fraude.LIQFRA,
    stafra: req.body.fraude.STAFRA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, movimiento)
}
const unasignFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
    liqfra: req.body.fraude.LIQFRA,
    stafra: req.body.fraude.STAFRA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, movimiento)
}
const cierreFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
    liqfra: req.body.fraude.LIQFRA,
    stafra: req.body.fraude.STAFRA,
  }
  const cierre = {
    reffra: req.body.cierre.REFFRA,
    sitcie: req.body.cierre.SITCIE,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, cierre, movimiento)
}

// hitos
const insertHitoFromRec = (req) => {
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
const updateHitoFromRec = (req) => {
  const hito = {
    idhito: req.body.hito.IDHITO,
    fechit: req.body.hito.FECHIT,
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
const insertHitoLiqFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const hito = {
    tiphit: req.body.hito.TIPHIT,
    imphit: req.body.hito.IMPHIT,
    obshit: req.body.hito.OBSHIT,
    stahit: req.body.hito.STAHIT,
  }
  const liquidacion = {
    tipliq: req.body.liquidacion.TIPLIQ,
    impliq: req.body.liquidacion.IMPLIQ,
    obsliq: req.body.liquidacion.OBSLIQ,
    staliq: req.body.liquidacion.STALIQ,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, hito, liquidacion, movimiento)
}
const insertHitoSanFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const hito = {
    tiphit: req.body.hito.TIPHIT,
    imphit: req.body.hito.IMPHIT,
    obshit: req.body.hito.OBSHIT,
    stahit: req.body.hito.STAHIT,
  }
  const sancion = {
    tipsan: req.body.sancion.TIPSAN,
    impsan: req.body.sancion.IMPSAN,
    obssan: req.body.sancion.OBSSAN,
    stasan: req.body.sancion.STASAN,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, hito, sancion, movimiento)
}
const deleteHitoFromRec = (req) => {
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
const cambioEstadoHitoFromRec = (req) => {
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

// eventos
const insertEventoFromRec = (req) => {
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
const updateEventoFromRec = (req) => {
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
const deleteEventoFromRec = (req) => {
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

// smss
const insertSmsFromRec = (req) => {
  const fraude = {
    IDFRAU: req.body.fraude.IDFRAU,
  }
  const sms = {
    fecsms: req.body.sms.FECSMS,
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
    stasms: req.body.sms.STASMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, sms, movimiento)
}
const updateSmsFromRec = (req) => {
  const sms = {
    idsmss: req.body.sms.IDSMSS,
    fecsms: req.body.sms.FECSMS,
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(sms, movimiento)
}
const deleteSmsFromRec = (req) => {
  const fraude = {
    IDFRAU: req.body.fraude.IDFRAU,
  }
  const sms = {
    idsmss: req.body.sms.IDSMSS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, sms, movimiento)
}

// relacionados
const insertRelacionFromRec = (req) => {
  const fraude = {
    IDFRAU: req.body.fraude.IDFRAU,
  }
  const relacion = {
    fecrel: req.body.relacion.FECREL,
    nifcon: req.body.relacion.NIFCON,
    nomcon: req.body.relacion.NOMCON,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, relacion, movimiento)
}
const updateRelacionFromRec = (req) => {
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
const deleteRelacionFromRec = (req) => {
  const fraude = {
    IDFRAU: req.body.fraude.IDFRAU,
  }
  const relacion = {
    idrela: req.body.relacion.IDRELA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(fraude, relacion, movimiento)
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
export const extendedFraudes = async (req, res) => {
  const context = req.body.fraude

  try {
    const result = await DAL.extended(context)

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
export const asignar = async (req, res) => {
  try {
    const result = await DAL.change(asignFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const desasignar = async (req, res) => {
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

// hito
export const hito = async (req, res) => {
  const context = req.body.hito

  try {
    const result = await DAL.findHitos(context)

    if (result.length === 1) {
      res.status(200).json(result[0])
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
    const result = await DAL.findHitos(context)

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
export const modificarHito = async (req, res) => {
  try {
    const result = await DAL.updateHito(updateHitoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarHito = async (req, res) => {
  try {
    const result = await DAL.removeHito(deleteHitoFromRec(req))

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
export const cambioEstadoHito = async (req, res) => {
  try {
    const result = await DAL.cambioEstadoHito(cambioEstadoHitoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// evento
export const evento = async (req, res) => {
  const context = req.body.evento

  try {
    const result = await DAL.findEventos(context)

    if (result.length === 1) {
      res.status(200).json(result[0])
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
    const result = await DAL.findEventos(context)

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
export const modificarEvento = async (req, res) => {
  try {
    const result = await DAL.updateEvento(updateEventoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarEvento = async (req, res) => {
  try {
    const result = await DAL.removeEvento(deleteEventoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// sms
export const sms = async (req, res) => {
  const context = req.body.sms

  try {
    const result = await DAL.findSmss(context)

    if (result.length === 1) {
      res.status(200).json(result[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const smss = async (req, res) => {
  const context = req.body.fraude

  try {
    const result = await DAL.findSmss(context)

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
    const result = await DAL.insertSms(insertSmsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificarSms = async (req, res) => {
  try {
    const result = await DAL.updateSms(updateSmsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarSms = async (req, res) => {
  try {
    const result = await DAL.removeSms(deleteSmsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// relaciones
export const relacion = async (req, res) => {
  const context = req.body.relacion

  console.log(context)
  try {
    const result = await DAL.findRelaciones(context)

    if (result.length === 1) {
      res.status(200).json(result[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const relaciones = async (req, res) => {
  const context = req.body.fraude

  try {
    const result = await DAL.findRelaciones(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearRelacion = async (req, res) => {
  try {
    const result = await DAL.insertRelacion(insertRelacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificarRelacion = async (req, res) => {
  try {
    const result = await DAL.updateRelacion(updateRelacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarRelacion = async (req, res) => {
  try {
    const result = await DAL.removeRelacion(deleteRelacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
