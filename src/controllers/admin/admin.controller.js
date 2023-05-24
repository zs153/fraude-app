import axios from 'axios'
import bcrypt from 'bcrypt'
import {
  arrTiposRol,
  arrTiposPerfil,
  tiposMovimiento,
} from '../../public/js/enumeraciones'
import { serverAPI } from '../../config/settings'

export const mainPage = async (req, res) => {
  const user = req.user

  res.render('admin', { user })
}
export const perfilPage = async (req, res) => {
  const user = req.user
  const usuario = {
    USERID: user.userid,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/usuario`, {
      usuario,
    })

    const datos = {
      usuario: result.data,
      arrTiposRol,
      arrTiposPerfil,
    }

    res.render('admin/perfil', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const changePassword = async (req, res) => {
  const user = req.user
  const salt = await bcrypt.genSalt(10)
  const passHash = await bcrypt.hash(req.body.pwdusu, salt)
  const usuario = {
    IDUSUA: req.body.idusua,
    PWDUSU: passHash,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.cambioPassword,
  }

  try {
    await axios.post(`http://${serverAPI}:8100/api/usuarios/cambio`, {
      usuario,
      movimiento,
    })

    res.redirect('/')
  } catch (error) {
    res.redirect('/admin')
  }
}
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: user.id,
    NOMUSU: req.body.nomusu.toUpperCase(),
    EMAUSU: req.body.emausu,
    TELUSU: req.body.telusu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarPerfil,
  }

  try {
    await axios.post(`http://${serverAPI}:8100/api/usuarios/perfil`, {
      usuario,
      movimiento,
    })

    res.redirect('.')
  } catch (error) {
    res.redirect('/admin')
  }
}
