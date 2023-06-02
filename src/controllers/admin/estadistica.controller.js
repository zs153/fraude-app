import axios from 'axios'
import { puertoAPI, serverAPI } from '../../config/settings'

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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/carga`, {
      context: {},
    })
    const cargas = result.data.data
    const datos = {
      desde,
      hasta,
      cargas,
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
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/cierre`, {
      context: {},
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estadisticas/contadores`, {
      context: {
        REFFRA: req.body.refcar,
        DESDE: periodo.DESDE,
        HASTA: periodo.HASTA,
        CRUERR: tipos.data.data[0].IDTIPO,
        SINEFE: tipos.data.data[1].IDTIPO,
        TRICOR: tipos.data.data[2].IDTIPO,
        PRESCR: tipos.data.data[3].IDTIPO,
      }
    })
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estadisticas/oficinas`, {
      context: {
        REFFRA: req.body.refcar
      },
    })
    // const actividad = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estadisticas/actividad`, {
    //   context: {
    //     REFFRA: req.body.refcar,
    //     DESDE: periodo.DESDE,
    //     HASTA: periodo.HASTA,
    //   }
    // })
    const cargas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/carga`, {
      context: {},
    })

    const serieC = []
    const serieL = []
    const serieS = []
    let contadores
    let importes
    let causas

    result.data.data.map(itm => {
      if (itm.FECHA) {
        serieC.push([new Date(itm.FECHA).getTime(), itm.CORREC])
        serieL.push([new Date(itm.FECHA).getTime(), itm.LIQUID])
        serieS.push([new Date(itm.FECHA).getTime(), itm.SANCIO])
      } else {
        const cruceError = itm.CRUERR
        const sinEfecto = itm.SINEFE
        const tributacionCorrecta = itm.TRICOR
        const prescrito = itm.PRESCR
        const otrosCasos = itm.OTRCAS
        const correctas = itm.CORREC
        const liquidadas = itm.LIQUID
        const sancionadas = itm.SANCIO
        const anuladas = itm.ANULAD
        const liquidado = itm.IMPLIQ
        const sancionado = itm.IMPSAN
        const anulado = itm.IMPANU

        contadores = {
          correctas,
          liquidadas,
          sancionadas,
          anuladas,
        }
        importes = {
          liquidado,
          sancionado,
          anulado,
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
      cargas: cargas.data.data,
      oficinas: oficinas.data.data,
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
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
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