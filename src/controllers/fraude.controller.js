import * as DAL from '../models/fraude.model'

// fraude
export const fraude = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.fraude(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const fraudes = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.fraudes(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const crearFraude = async (req, res) => {
  // context
  const fraude = {
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
  const context = Object.assign(fraude, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const modificarFraude = async (req, res) => {
  // context
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
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
  const context = Object.assign(fraude, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }  
}
export const borrarFraude = async (req, res) => {
  // context
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const asignarFraude = async (req, res) => {
  // context
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
    liqfra: req.body.fraude.LIQFRA,
    stafra: req.body.fraude.STAFRA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, movimiento)

  // proc
  try {
    const result = await DAL.change(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const desasignarFraude = async (req, res) => {
  // context
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
    liqfra: req.body.fraude.LIQFRA,
    stafra: req.body.fraude.STAFRA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, movimiento)

  // proc
  try {
    const result = await DAL.unasing(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const cierreFraude = async (req, res) => {
  // context
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
  const context = Object.assign(fraude, cierre, movimiento)

  // proc
  try {
    const result = await DAL.close(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}

// hito
export const hito = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.hito(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const hitos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.hitos(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const crearHito = async (req, res) => {
  // context
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
  const context = Object.assign(fraude, hito, movimiento)

  // proc
  try {
    const result = await DAL.insertHito(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const modificarHito = async (req, res) => {
  // context
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
  const context = Object.assign(hito, movimiento)

  // proc
  try {
    const result = await DAL.updateHito(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const borrarHito = async (req, res) => {
  // context
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
  const context = Object.assign(fraude, hito, movimiento)

  // proc
  try {
    const result = await DAL.removeHito(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const crearHitoLiquidacion = async (req, res) => {
  // context
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
  const context = Object.assign(fraude, hito, liquidacion, movimiento)

  // proc
  try {
    const result = await DAL.insertHitoLiquidacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const crearHitoSancion = async (req, res) => {
  // context
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
  const context = Object.assign(fraude, hito, sancion, movimiento)

  // proc
  try {
    const result = await DAL.insertHitoSancion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const cambioEstadoHito = async (req, res) => {
  // context
  const hito = {
    idhito: req.body.hito.IDHITO,
    stahit: req.body.hito.STAHIT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(hito, movimiento)

  // proc
  try {
    const result = await DAL.cambioEstadoHito(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}

// evento
export const evento = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.evento(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const eventos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.eventos(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const crearEvento = async (req, res) => {
  // context
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const evento = {
    tipeve: req.body.evento.TIPEVE,
    obseve: req.body.evento.OBSEVE,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, evento, movimiento)

  // proc
  try {
    const result = await DAL.insertEvento(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const modificarEvento = async (req, res) => {
  // context
  const evento = {
    ideven: req.body.evento.IDEVEN,
    tipeve: req.body.evento.TIPEVE,
    obseve: req.body.evento.OBSEVE,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(evento, movimiento)

  // proc
  try {
    const result = await DAL.updateEvento(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const borrarEvento = async (req, res) => {
  // context
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
  const context = Object.assign(fraude, evento, movimiento)

  // proc
  try {
    const result = await DAL.removeEvento(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}

// sms
export const sms = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.sms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const smss = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.smss(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const crearSms = async (req, res) => {
  // context
  const fraude = {
    IDFRAU: req.body.fraude.IDFRAU,
  }
  const sms = {
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
    stasms: req.body.sms.STASMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, sms, movimiento)

  // proc
  try {
    const result = await DAL.insertSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const modificarSms = async (req, res) => {
  // context
  const sms = {
    idsmss: req.body.sms.IDSMSS,
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(sms, movimiento)

  // proc
  try {
    const result = await DAL.updateSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const borrarSms = async (req, res) => {
  // context
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
  const context = Object.assign(fraude, sms, movimiento)

  // proc
  try {
    const result = await DAL.removeSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}

// relaciones
export const relacion = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.relacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const relaciones = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.relaciones(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const crearRelacion = async (req, res) => {
  // context
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const relacion = {
    nifcon: req.body.relacion.NIFCON,
    nomcon: req.body.relacion.NOMCON,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, relacion, movimiento)

  // proc
  try {
    const result = await DAL.insertRelacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const modificarRelacion = async (req, res) => {
  // context
  const relacion = {
    idrela: req.body.relacion.IDRELA,
    nifcon: req.body.relacion.NIFCON,
    nomcon: req.body.relacion.NOMCON,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(relacion, movimiento)

  // proc
  try {
    const result = await DAL.updateRelacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const borrarRelacion = async (req, res) => {
  // context
  const fraude = {
    idfrau: req.body.fraude.IDFRAU,
  }
  const relacion = {
    idrela: req.body.relacion.IDRELA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, relacion, movimiento)

  // proc
  try {
    const result = await DAL.removeRelacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}

// ades
export const asignarFraudesUsuario = async (req, res) => {
  // context
  const fraude = {
    LIQFRA: req.body.fraude.LIQFRA,
    STAFRA: req.body.fraude.STAFRA,
  }  
  const fraudes = {
    arrfra: {
      val: req.body.fraudes.ARRFRA,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, fraudes, movimiento)

  // proc
  try {
    const result = await DAL.asignarFraudesUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}
export const desAsignarFraudesUsuario = async (req, res) => {
  // context
  const fraude = {
    LIQFRA: req.body.fraude.LIQFRA,
    STAFRA: req.body.fraude.STAFRA,
  }  
  const fraudes = {
    arrfra: {
      val: req.body.fraudes.ARRFRA,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(fraude, fraudes, movimiento)

  // proc
  try {
    const result = await DAL.desAsignarFraudesUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: err })
  }
}