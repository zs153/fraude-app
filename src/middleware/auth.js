import jwt from 'jsonwebtoken'
import { secreto } from '../config/settings'
import { tiposRol } from '../public/js/enumeraciones'

const authRoutes = (req, res, next) => {
  const tokenHeader = req.cookies.auth

  if (typeof tokenHeader !== 'undefined') {
    try {
      jwt.verify(
        tokenHeader,
        `${secreto}`,
        (err, user) => {
          if (err) {
            throw new Error('Token expirado')
          }

          req.user = user
          next()
        }
      )
    } catch (error) {
      res.render('log/sign-in', {
        datos: req.body,
        alerts: [{ msg: 'La contraseña no es correcta' }],
      })
    }
  } else {
    res.render('log/sign-in', { datos: req.body, alerts: undefined })
  }
}
export const verifyTokenAndAdmin = (req, res, next) => {
  authRoutes(req, res, () => {
    if (req.user.rol === tiposRol.admin) {
      next()
    } else {
      res.status(410).json('No tienes autorización')
    }
  })
}
export const verifyTokenAndResp = (req, res, next) => {
  authRoutes(req, res, () => {
    if (req.user.rol === tiposRol.responsable || req.user.rol === tiposRol.admin) {
      next()
    } else {
      res.status(410).json('No tienes autorización')
    }
  })
}

export default authRoutes
