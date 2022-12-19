import axios from 'axios'
import { connectionClass } from 'oracledb'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const fecha = new Date()
  const currentYear = fecha.getFullYear()
  const currentMonth = fecha.getMonth() + 1
  const lastDayMonth = new Date(currentYear, currentMonth, 0).getDate()

  let desde = new Date(yearMonthDayToUTCString(currentYear, currentMonth, 1)).toISOString().slice(0, 10)
  let hasta = new Date(yearMonthDayToUTCString(currentYear, currentMonth, lastDayMonth)).toISOString().slice(0, 10)

  try {
    const cargas = await axios.post('http://localhost:8100/api/cargas', {})
    const datos = {
      desde,
      hasta,
      cargas: cargas.data,
    }

    res.render('admin/estadisticas', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const generarEstadistica = async (req, res) => {
  const user = req.user
  const periodo = {
    DESDE: req.body.desde,
    HASTA: req.body.hasta,
  }
  const fraude = {
    REFFRA: req.body.refcar,
  }

  try {
    const tipos = await axios.post('http://localhost:8100/api/tipos/cierres', {})
    const cargas = await axios.post('http://localhost:8100/api/cargas', {})
    const situacion = await axios.post('http://localhost:8100/api/estadisticas/situacion', {
      fraude,
      periodo,
      tipos: tipos.data,
    })
    const oficinas = await axios.post('http://localhost:8100/api/estadisticas/oficinas', {
      fraude,
    })
    const actuacion = await axios.post('http://localhost:8100/api/estadisticas/actuacion', {
      fraude,
      periodo,
    })

    const serieC = []
    const serieL = []
    const serieS = []
    let contadores
    let importes
    let causas

    situacion.data.map(itm => {
      if (itm.FECCIE) {
        serieC.push({ x: itm.FECCIE.slice(0, 10), y: itm.CORREC })
      } else {
        const cruceError = itm.CRUERR
        const sinEfecto = itm.SINEFE
        const tributacionCorrecta = itm.TRICOR
        const prescrito = itm.PRESCR
        const otrosCasos = itm.OTRCAS
        const correctas = itm.CORREC

        contadores = {
          correctas,
        }
        causas = {
          cruceError,
          sinEfecto,
          tributacionCorrecta,
          prescrito,
          otrosCasos,
        }
      }
    })

    actuacion.data.map(itm => {
      if (itm.FECCIE) {
        serieL.push({ x: itm.FECCIE.slice(0, 10), y: itm.LIQUID })
        serieS.push({ x: itm.FECCIE.slice(0, 10), y: itm.SANCIO })
      } else {
        const liquidadas = itm.LIQUID
        const sancionadas = itm.SANCIO
        const anuladas = itm.ANULAD
        const liquidado = itm.IMPLIQ
        const sancionado = itm.IMPSAN
        const anulado = itm.IMPANU

        contadores.liquidadas = liquidadas
        contadores.sancionadas = sancionadas
        contadores.anuladas = anuladas

        importes = {
          liquidado,
          sancionado,
          anulado,
        }
      }
    })

    const totalActuacion = contadores.correctas + contadores.liquidadas + contadores.sancionadas
    const totalCausas = causas.cruceError + causas.sinEfecto + causas.tributacionCorrecta + causas.prescrito + causas.otrosCasos
    const ratios = {
      correctas: Math.round((contadores.correctas * 100 / totalActuacion) * 100) / 100.0,
      liquidacion: Math.round((contadores.liquidadas * 100 / totalActuacion) * 100) / 100.0,
      sancion: Math.round((contadores.sancionadas * 100 / totalActuacion) * 100) / 100.0,
      cruceError: Math.round((causas.cruceError * 100 / totalCausas) * 100) / 100.0,
      sinEfecto: Math.round((causas.sinEfecto * 100 / totalCausas) * 100) / 100.0,
      tributacionCorrecta: Math.round((causas.tributacionCorrecta * 100 / totalCausas) * 100) / 100.0,
      prescrito: Math.round((causas.prescrito * 100 / totalCausas) * 100) / 100.0,
      otrosCasos: Math.round((causas.otrosCasos * 100 / totalCausas) * 100) / 100.0,
    }

    const datos = {
      fraude,
      cargas: cargas.data,
      oficinas: oficinas.data,
      periodo,
      contadores,
      importes,
      causas,
      ratios,
      serieC: JSON.stringify(serieC),
      serieL: JSON.stringify(serieL),
      serieS: JSON.stringify(serieS),
    }

    res.render('admin/estadisticas/resultado', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// helpers
const yearMonthDayToUTCString = (year, month, day) => {
  const yearCDM = ('000' + year).slice(-4)
  const monthCDM = ('0' + month).slice(-2)
  const dayCDM = ('0' + day).slice(-2)

  const fecha = new Date(`${yearCDM}-${monthCDM}-${dayCDM}T00:00:00`)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10)
}