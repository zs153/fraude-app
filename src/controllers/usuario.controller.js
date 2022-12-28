import axios from 'axios'
import bcrypt from 'bcrypt'
import {
  arrTiposRol,
  arrTiposPerfil,
  arrEstadosUsuario,
  estadosUsuario,
  tiposMovimiento,
  tiposRol,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  if (user.rol === tiposRol.responsable) {
    usuario.ofiusu = user.oficina
  }

  try {
    const result = await axios.post('http://localhost:8100/api/usuarios', {})
    const datos = {
      usuarios: JSON.stringify(result.data),
      estadosUsuario: JSON.stringify(estadosUsuario),
    }

    res.render('admin/usuarios', { user, datos })
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
    const oficinas = await axios.post('http://localhost:8100/api/oficinas', {})
    const datos = {
      oficinas: oficinas.data,
      arrTiposRol,
      arrTiposPerfil,
      arrEstadosUsuario,
      tiposRol,
    }

    res.render('admin/usuarios/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.params.id,
  }

  try {
    const oficinas = await axios.post('http://localhost:8100/api/oficinas', {})
    const result = await axios.post('http://localhost:8100/api/usuario', {
      usuario,
    })
    const datos = {
      usuario: result.data,
      oficinas: oficinas.data,
      arrTiposRol,
      arrTiposPerfil,
      arrEstadosUsuario,
      tiposRol,
    }

    res.render('admin/usuarios/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

export const insert = async (req, res) => {
  const user = req.user
  const randomString = Math.random().toString(36).substring(2, 10);
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(randomString, salt);
  const usuario = {
    NOMUSU: req.body.nomusu.toUpperCase(),
    OFIUSU: req.body.ofiusu,
    ROLUSU: req.body.rolusu,
    USERID: req.body.userid.toLowerCase(),
    EMAUSU: req.body.emausu,
    PERUSU: req.body.perusu,
    TELUSU: req.body.telusu,
    PWDUSU: passHash,
    STAUSU: req.body.stausu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearUsuario,
  }

  try {
    await axios.post('http://localhost:8100/api/usuarios/insert', {
      usuario,
      movimiento,
    })

    res.redirect('/admin/usuarios')
  } catch (error) {
    let msg = 'No se ha podido crear el nuevo usuario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
    NOMUSU: req.body.nomusu.toUpperCase(),
    OFIUSU: req.body.ofiusu,
    ROLUSU: req.body.rolusu,
    USERID: req.body.userid.toLowerCase(),
    EMAUSU: req.body.emausu,
    PERUSU: req.body.perusu,
    TELUSU: req.body.telusu,
    STAUSU: req.body.stausu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarUsuario,
  }

  try {
    await axios.post('http://localhost:8100/api/usuarios/update', {
      usuario,
      movimiento,
    })

    res.redirect('/admin/usuarios')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos del usuario. Verifique los datos introducidos'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuario,
  }

  try {
    await axios.post('http://localhost:8100/api/usuarios/delete', {
      usuario,
      movimiento,
    })

    res.redirect('/admin/usuarios')
  } catch (error) {
    const msg = 'No se ha podido elminar la oficina.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
