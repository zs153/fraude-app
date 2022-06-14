import axios from 'axios'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  arrTiposRol,
  arrTiposPerfil,
  arrEstadosUsuario,
  estadosUsuario,
  tiposMovimiento,
  tiposRol,
  tiposPerfil,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const usuario = {}

  if (user.rol === tiposRol.responsable) {
    usuario.ofiusu = user.oficina
  }

  try {
    const result = await axios.post('http://localhost:8100/api/usuarios', {
      usuario
    })
    const datos = {
      usuarios: JSON.stringify(result.data),
      estadosUsuario,
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
  const usuario = {
    STAUSU: estadosUsuario.activo,
    ROLUSU: tiposRol.usuario,
    PERUSU: tiposPerfil.general,
  }
  try {
    const datos = {
      usuario,
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
    idusua: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/usuario', {
      usuario,
    })
    const datos = {
      usuario: result.data,
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
export const perfilPage = async (req, res) => {
  const user = req.user
  let usuario = {
    userid: req.params.userid,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/usuario', {
      usuario,
    })

    usuario = {
      IDUSUA: result.data.IDUSUA,
      NOMUSU: result.data.NOMUSU,
      OFIUSU: result.data.OFIUSU,
      USERID: result.data.USERID,
      EMAUSU: result.data.EMAUSU,
      TELUSU: result.data.TELUSU,
    }

    const datos = {
      usuario,
    }
    res.render('admin/usuarios/perfil', { user, datos })
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
    nomusu: req.body.nomusu.toUpperCase(),
    ofiusu: req.body.ofiusu,
    rolusu: req.body.rolusu,
    userid: req.body.userid.toLowerCase(),
    emausu: req.body.emausu,
    perusu: req.body.perusu,
    telusu: req.body.telusu,
    pwdusu: passHash,
    stausu: req.body.stausu,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearUsuario,
  }

  try {
    const result = await axios.post(
      'http://localhost:8100/api/usuarios/insert',
      {
        usuario,
        movimiento,
      }
    )

    res.redirect('/admin/usuarios')
  } catch (error) {
    let msg = 'No se ha podido crear el nuevo usuario.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El usuario ya está registrado'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user

  const usuario = {
    idusua: req.body.idusua,
    nomusu: req.body.nomusu.toUpperCase(),
    ofiusu: req.body.ofiusu,
    rolusu: req.body.rolusu,
    userid: req.body.userid.toLowerCase(),
    emausu: req.body.emausu,
    perusu: req.body.perusu,
    telusu: req.body.telusu,
    stausu: req.body.stausu,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarUsuario,
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

    if (error.response.data.errorNum === 20100) {
      msg =
        'El usuario ya está registrado. Verifique el userID y la contraseña.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const usuario = {
    idusua: req.body.idusua,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarUsuario,
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
export const changePassword = async (req, res) => {
  const user = req.user
  const salt = await bcrypt.genSalt(10)
  const passHash = await bcrypt.hash(req.body.pwdusu, salt)
  const usuario = {
    idusua: req.body.idusua,
    pwdusu: passHash,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.cambioPassword,
  }

  try {
    const result = await axios.post(
      'http://localhost:8100/api/usuarios/cambio',
      {
        usuario,
        movimiento,
      }
    )

    res.redirect('/admin/usuarios')
  } catch (error) {
    res.redirect('/admin/usuarios')
  }
}
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    idusua: req.body.idusua,
    nomusu: req.body.nomusu,
    ofiusu: req.body.ofiusu,
    emausu: req.body.emausu,
    telusu: req.body.telusu,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarPerfil,
  }

  try {
    const result = await axios.post(
      'http://localhost:8100/api/usuarios/perfil',
      {
        usuario,
        movimiento,
      }
    )

    const accessToken = jwt.sign(
      {
        id: user.id,
        nombre: usuario.nomusu,
        userID: user.userID,
        email: usuario.emausu,
        rol: user.rol,
        oficina: usuario.ofiusu,
        telefono: usuario.telusu,
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: '8h' }
    )
    const options = {
      path: '/',
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
      httpOnly: true,
    }

    res.cookie('auth', accessToken, options)
    res.redirect('/admin')
  } catch (error) {
    res.redirect('/admin')
  }
}