import axios from 'axios'
import { tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post('http://localhost:8100/api/oficinas', {})
    const datos = {
      oficinas: JSON.stringify(result.data),
    }

    res.render('admin/oficinas', { user, datos })
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
    res.render('admin/oficinas/add', { user })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.params.id,
  }
  try {
    const result = await axios.post('http://localhost:8100/api/oficina', {
      oficina,
    })
    const datos = {
      oficina: result.data,
    }

    res.render('admin/oficinas/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const insert = async (req, res) => {
  const user = req.user
  const oficina = {
    DESOFI: req.body.desofi.toUpperCase(),
    CODOFI: req.body.codofi.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearOficina,
  }

  try {
    await axios.post('http://localhost:8100/api/oficinas/insert', {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
  } catch (error) {
    let msg = 'No se ha podido crear la oficina.'

    if (error.response.data.errorNum === 20100) {
      msg = 'La oficina ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.body.idofic,
    DESOFI: req.body.desofi.toUpperCase(),
    CODOFI: req.body.codofi.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarOficina,
  }

  try {
    await axios.post('http://localhost:8100/api/oficinas/update', {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos de la oficina. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'La oficina ya existe'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.body.idofic,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarOficina,
  }

  try {
    await axios.post('http://localhost:8100/api/oficinas/delete', {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
  } catch (error) {
    const msg = 'No se ha podido elminar la oficina.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
