import axios from "axios";
import { serverAPI, puertoAPI } from "../../config/settings";
import { tiposMovimiento, estadosCarga } from "../../public/js/enumeraciones";

// pages
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevCarg = cursor ? true : false
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cargas`, {
      context,
    })

    let cargas = result.data.data
    let hasNextCarg = cargas.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextCarg) {
      nextCursor = dir === 'next' ? cargas[limit - 1].IDCARG : cargas[0].IDCARG
      prevCursor = dir === 'next' ? cargas[0].IDCARG : cargas[limit - 1].IDCARG

      cargas.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : cargas[0]?.IDCARG
      prevCursor = dir === 'next' ? cargas[0]?.IDCARG : 0

      if (cursor) {
        hasNextCarg = nextCursor === 0 ? false : true
        hasPrevCarg = prevCursor === 0 ? false : true
      } else {
        hasNextCarg = false
        hasPrevCarg = false
      }
    }

    if (dir === 'prev') {
      cargas = cargas.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      cargas,
      hasNextCarg,
      hasPrevCarg,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/cargas', { user, datos })
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
};
export const addPage = async (req, res) => {
  const user = req.user;

  try {
    res.render("admin/cargas/add", { user });
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
};

// proc
export const insert = async (req, res) => {
  const user = req.user;
  const carga = {
    DESCAR: req.body.descar.toUpperCase(),
    FICCAR: req.body.ficcar,
    REFCAR: req.body.refcar,
    STACAR: estadosCarga.procesado,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearCarga,
  };

  try {
    await axios.post(`http://${serverAPI}:8100/api/cargas/insert`, {
      carga,
      movimiento,
    });

    res.redirect(`/admin/cargas`);
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
};

// helpers
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}