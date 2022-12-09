import axios from 'axios'
import {
  arrEstadosSms,
  estadosSms,
  tiposMovimiento,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const sms = {
    stasms: estadosSms.pendiente,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/smss', {
      sms,
    })
    const datos = {
      smss: JSON.stringify(result.data),
      estadosSms,
      verTodo: false,
    }

    res.render('admin/smss', { user, datos })
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
    const datos = {
      arrEstadosSms,
    }

    res.render('admin/smss/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const sms = {
    idsmss: req.params.id
  }

  try {
    const result = await axios.post('http://localhost:8100/api/sms', {
      sms,
    })
    const datos = {
      sms: result.data,
      arrEstadosSms,
    }

    res.render('admin/smss/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const insertSms = async (req, res) => {
  const user = req.user
  const sms = {
    movsms: req.body.movsms,
    texsms: req.body.texsms,
    stasms: estadosSms.pendiente,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearSms,
  }

  try {
    await axios.post('http://localhost:8100/api/smss/insert', {
      sms,
      movimiento,
    })

    res.redirect('/admin/smss')
  } catch (error) {
    let msg = 'No se ha podido crear el sms. Verifique la referencia'

    if (error.response.data.errorNum === 20100) {
      msg = 'El sms ya existe.'
    }
    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const updateSms = async (req, res) => {
  const user = req.user
  const sms = {
    idsmss: req.body.idsmss,
    texsms: req.body.texsms,
    movsms: req.body.movsms,
    stasms: req.body.stasms,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarSms,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/smss/update', {
      sms,
      movimiento,
    })

    res.redirect('/admin/smss')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos del sms. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'El sms ya existe'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const deleteSms = async (req, res) => {
  const user = req.user
  const sms = {
    idsmss: req.body.idsmss,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarSms,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/smss/delete', {
      sms,
      movimiento,
    })

    res.redirect('/admin/smss')
  } catch (error) {
    const msg = 'No se ha podido elminar el sms.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const verTodo = async (req, res) => {
  const user = req.user
  const sms = {
    stasms: estadosSms.pendiente + estadosSms.enviado,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/smss', {
      sms,
    })

    const datos = {
      smss: JSON.stringify(result.data),
      estadosSms,
      verTodo: true,
    }

    res.render('admin/smss', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
