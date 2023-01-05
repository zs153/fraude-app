import axios from 'axios'
import { tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const tipo = {}

  try {
    const result = await axios.post('http://localhost:8100/api/tipos/cierres', {
      tipo,
    })
    const datos = {
      tipos: result.data,
    }

    res.render('admin/tipos/cierres', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user

  try {
    res.render('admin/tipos/cierres/add', { user })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/tipos/cierre', {
      tipo,
    })
    const datos = {
      tipo: result.data,
    }

    res.render('admin/tipos/cierres/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

export const insert = async (req, res) => {
  const user = req.user
  const tipo = {
    DESTIP: req.body.destip.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTipoCierre,
  }

  try {
    await axios.post('http://localhost:8100/api/tipos/cierres/insert', {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/cierres`)
  } catch (error) {
    let msg = 'No se ha podido crear el subtipo.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
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
    await axios.post('http://localhost:8100/api/tipos/cierres/update', {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/cierres`)
  } catch (error) {
    let msg =
      'No se han podido modificar los datos del subtipo. Verifique los datos introducidos'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const tipo = {
    IDTIPO: req.body.idtipo,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTipoCierre,
  }

  try {
    await axios.post('http://localhost:8100/api/tipos/cierres/delete', {
      tipo,
      movimiento,
    })

    res.redirect(`/admin/tipos/cierres`)
  } catch (error) {
    const msg = 'No se ha podido elminar el subtipo.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
