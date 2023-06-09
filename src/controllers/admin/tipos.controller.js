import axios from 'axios'
import { serverAPI, puertoAPI } from '../../config/settings'
import { tiposMovimiento, arrEstadosHito } from '../../public/js/enumeraciones'

// pages
// cierres
export const mainCierresPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevCierr = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/cierres`, {
      context,
    });

    let cierres = result.data.data
    let hasNextCierr = cierres.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextCierr) {
      nextCursor = dir === 'next' ? cierres[limit - 1].IDTIPO : cierres[0].IDTIPO
      prevCursor = dir === 'next' ? cierres[0].IDTIPO : cierres[limit - 1].IDTIPO

      cierres.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : cierres[0]?.IDTIPO
      prevCursor = dir === 'next' ? cierres[0]?.IDTIPO : 0

      if (cursor) {
        hasNextCierr = nextCursor === 0 ? false : true
        hasPrevCierr = prevCursor === 0 ? false : true
      } else {
        hasNextCierr = false
        hasPrevCierr = false
      }
    }

    if (dir === 'prev') {
      cierres = cierres.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      cierres,
      hasNextCierr,
      hasPrevCierr,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    };

    res.render("admin/tipos/cierres", { user, datos });
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
export const addCierrePage = async (req, res) => {
  const user = req.user

  try {
    res.render('admin/tipos/cierres/add', { user })
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
export const editCierrePage = async (req, res) => {
  const user = req.user
  
  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/cierre`, {
      context: {
        IDTIPO: req.params.id,
      },
    })
    const tipo = result.data.data[0]
    const datos = {
      tipo,
    }

    res.render('admin/tipos/cierres/edit', { user, datos })
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
// eventos
export const mainEventosPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevEven = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/eventos`, {
      context,
    });

    let eventos = result.data.data
    let hasNextEven = eventos.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextEven) {
      nextCursor = dir === 'next' ? eventos[limit - 1].IDTIPO : eventos[0].IDTIPO
      prevCursor = dir === 'next' ? eventos[0].IDTIPO : eventos[limit - 1].IDTIPO

      eventos.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : eventos[0]?.IDTIPO
      prevCursor = dir === 'next' ? eventos[0]?.IDTIPO : 0

      if (cursor) {
        hasNextEven = nextCursor === 0 ? false : true
        hasPrevEven = prevCursor === 0 ? false : true
      } else {
        hasNextEven = false
        hasPrevEven = false
      }
    }

    if (dir === 'prev') {
      eventos = eventos.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      eventos,
      hasNextEven,
      hasPrevEven,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    };

    res.render("admin/tipos/eventos", { user, datos });
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
export const addEventoPage = async (req, res) => {
  const user = req.user

  try {
    res.render('admin/tipos/eventos/add', { user })
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
export const editEventoPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/evento`, {
      context: {
        IDTIPO: req.params.id,
      },
    })
    const tipo = result.data.data[0]
    const datos = {
      tipo,
    }

    res.render('admin/tipos/eventos/edit', { user, datos })
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
// fraudes
export const mainFraudesPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevFrau = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/fraudes`, {
      context,
    });

    let fraudes = result.data.data
    let hasNextFrau = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextFrau) {
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDTIPO : fraudes[0].IDTIPO
      prevCursor = dir === 'next' ? fraudes[0].IDTIPO : fraudes[limit - 1].IDTIPO

      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDTIPO
      prevCursor = dir === 'next' ? fraudes[0]?.IDTIPO : 0

      if (cursor) {
        hasNextFrau = nextCursor === 0 ? false : true
        hasPrevFrau = prevCursor === 0 ? false : true
      } else {
        hasNextFrau = false
        hasPrevFrau = false
      }
    }

    if (dir === 'prev') {
      fraudes = fraudes.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      fraudes,
      hasNextFrau,
      hasPrevFrau,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    };

    res.render("admin/tipos/fraudes", { user, datos });
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
export const addFraudePage = async (req, res) => {
  const user = req.user

  try {
    res.render('admin/tipos/fraudes/add', { user })
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
export const editFraudePage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/fraude`, {
      context: {
        IDTIPO: req.params.id,
      },
    })
    const tipo = result.data.data[0]
    const datos = {
      tipo,
    }

    res.render('admin/tipos/fraudes/edit', { user, datos })
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
// hitos
export const mainHitosPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevHito = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hitos`, {
      context,
    });

    let hitos = result.data.data
    let hasNextHito = hitos.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextHito) {
      nextCursor = dir === 'next' ? hitos[limit - 1].IDTIPO : hitos[0].IDTIPO
      prevCursor = dir === 'next' ? hitos[0].IDTIPO : hitos[limit - 1].IDTIPO

      hitos.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : hitos[0]?.IDTIPO
      prevCursor = dir === 'next' ? hitos[0]?.IDTIPO : 0

      if (cursor) {
        hasNextHito = nextCursor === 0 ? false : true
        hasPrevHito = prevCursor === 0 ? false : true
      } else {
        hasNextHito = false
        hasPrevHito = false
      }
    }

    if (dir === 'prev') {
      hitos = hitos.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      hitos,
      hasNextHito,
      hasPrevHito,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    };

    res.render("admin/tipos/hitos", { user, datos });
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
export const addHitoPage = async (req, res) => {
  const user = req.user
  const datos = {
    arrEstadosHito,
  }

  try {
    res.render('admin/tipos/hitos/add', { user, datos })
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
export const editHitoPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hito`, {
      context: {
        IDTIPO: req.params.id,
      },
    })
    const tipo = result.data.data[0]
    const datos = {
      tipo,
      arrEstadosHito,
    }

    res.render('admin/tipos/hitos/edit', { user, datos })
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

// func
// cierres
export const insertCierre = async (req, res) => {
  const user = req.user
  const tipo = {
    DESTIP: req.body.destip.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTipoCierre,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/cierres/insert`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/cierres?part=${req.query.part}`)
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
export const updateCierre = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
    DESTIP: req.body.destip.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTipoCierre,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/cierres/update`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/cierres?part=${req.query.part}`)
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
export const removeCierre = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTipoCierre,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/cierres/delete`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/cierres?part=${req.query.part}`)
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
// eventos
export const insertEvento = async (req, res) => {
  const user = req.user
  const tipo = {
    DESTIP: req.body.destip.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTipoEvento,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/eventos/insert`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/eventos?part=${req.query.part}`)
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
export const updateEvento = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
    DESTIP: req.body.destip.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTipoEvento,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/eventos/update`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/eventos?part=${req.query.part}`)
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
export const removeEvento = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTipoEvento,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/eventos/delete`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/eventos?part=${req.query.part}`)
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
// fraudes
export const insertFraude = async (req, res) => {
  const user = req.user
  const tipo = {
    DESTIP: req.body.destip.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTipoFraude,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/fraudes/insert`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/fraudes?part=${req.query.part}`)
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
export const updateFraude = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
    DESTIP: req.body.destip.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTipoFraude,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/fraudes/update`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/fraudes?part=${req.query.part}`)
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
export const removeFraude = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTipoFraude,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/fraudes/delete`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/fraudes?part=${req.query.part}`)
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
// hitos
export const insertHito = async (req, res) => {
  const user = req.user
  const tipo = {
    DESTIP: req.body.destip.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTipoHito,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hitos/insert`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/hitos?part=${req.query.part}`)
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
export const updateHito = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
    DESTIP: req.body.destip.toUpperCase(),
    ANUHIT: req.body.anuhit,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTipoHito,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hitos/update`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/hitos?part=${req.query.part}`)
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
export const removeHito = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTipoHito,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hitos/delete`, {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/hitos?part=${req.query.part}`)
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
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}