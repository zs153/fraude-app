import axios from 'axios'

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
    desde: req.body.desde,
    hasta: req.body.hasta,
  }
  const fraude = {
    REFFRA: req.body.refcar,
  }

  try {
    const situacion = await axios.post('http://localhost:8100/api/estadisticas/situacion', {
      fraude,
    })
    const oficinas = await axios.post('http://localhost:8100/api/estadisticas/oficinas', {
      fraude,
    })
    const actuacion = await axios.post('http://localhost:8100/api/estadisticas/actuacion', {
      fraude,
      tiposMovimiento,
      periodo,
    })

    const serieL = []
    const serieS = []
    const serieC = []

    actuacion.data.map(itm => {
      serieC.push({ x: itm.FEC, y: itm.COR })
      serieL.push({ x: itm.FEC, y: itm.LIQ })
      serieS.push({ x: itm.FEC, y: itm.SAN })
    })

    const totalSituacion = situacion.data.TOTAL
    const ratios = {
      propuestaLiquidacion: Math.round((hitos.data.PROLIQ * 100 / totalSituacion) * 100) / 100.0,
      propuestaSancion: Math.round((hitos.data.PROSAN * 100 / totalSituacion) * 100) / 100.0,
      liquidacion: Math.round((hitos.data.LIQUID * 100 / totalSituacion) * 100) / 100.0,
      sancion: Math.round((hitos.data.SANCIO * 100 / totalSituacion) * 100) / 100.0,
      anulacion: Math.round((hitos.data.ANUSAN * 100 / totalSituacion) * 100) / 100.0,
      correctas: Math.round((situacion.data.CORREC * 100 / totalSituacion) * 100) / 100.0,
    }
    const datos = {
      fraude,
      periodo,
      tipo,
      hitos: hitos.data,
      oficinas: oficinas.data,
      situacion: situacion.data,
      ratios,
      serieC: JSON.stringify(serieC),
      serieL: JSON.stringify(serieL),
      serieS: JSON.stringify(serieS),
    }

    res.render('admin/estadisticas/fraudes', { user, datos })
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