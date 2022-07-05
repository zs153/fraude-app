import * as DAL from '../models/usuario.model'

const insertFromRec = (req) => {
  const usuario = {
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    rolusu: req.body.usuario.rolusu,
    userid: req.body.usuario.userid,
    emausu: req.body.usuario.emausu,
    perusu: req.body.usuario.perusu,
    telusu: req.body.usuario.telusu,
    pwdusu: req.body.usuario.pwdusu,
    stausu: req.body.usuario.stausu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(usuario, movimiento)
}
const updateFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.idusua,
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    rolusu: req.body.usuario.rolusu,
    userid: req.body.usuario.userid,
    emausu: req.body.usuario.emausu,
    perusu: req.body.usuario.perusu,
    telusu: req.body.usuario.telusu,
    stausu: req.body.usuario.stausu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(usuario, movimiento)
}
const deleteFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.idusua,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(usuario, movimiento)
}
const registroFromRec = (req) => {
  const usuario = {
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    rolusu: req.body.usuario.rolusu,
    userid: req.body.usuario.userid,
    emausu: req.body.usuario.emausu,
    perusu: req.body.usuario.perusu,
    telusu: req.body.usuario.telusu,
    stausu: req.body.usuario.stausu,
    pwdusu: req.body.usuario.pwdusu,
    tipmov: req.body.usuario.tipmov,
  }
  const movimiento = {
    tipmov: req.body.movimiento.tipmov,
  }
  const passwd = {
    saltus: req.body.passwd.saltus,
  }

  return Object.assign(usuario, movimiento, passwd)
}
const cambioFromRec = (req) => {
  const cambio = {
    idusua: req.body.usuario.idusua,
    pwdusu: req.body.usuario.pwdusu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(cambio, movimiento)
}
const olvidoFromRec = (req) => {
  const usuario = {
    emausu: req.body.usuario.emausu,
    pwdusu: req.body.usuario.pwdusu,
  }
  const movimiento = {
    tipmov: req.body.movimiento.tipmov,
    saltus: req.body.movimiento.saltus,
  }

  return Object.assign(usuario, movimiento)
}
const perfilFromRec = (req) => {
  const perfil = {
    idusua: req.body.usuario.idusua,
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    emausu: req.body.usuario.emausu,
    telusu: req.body.usuario.telusu,
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return perfil
}

export const usuario = async (req, res) => {
  const context = req.body.usuario
  try {
    const rows = await DAL.find(context)

    if (rows.length === 1) {
      return res.status(200).json(rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const usuarios = async (req, res) => {
  const context = req.body.usuario

  try {
    const rows = await DAL.findAll(context)

    res.status(200).json(rows)
  } catch (err) {
    res.status(400).end()
  }
}

export const insert = async (req, res) => {
  try {
    const result = await DAL.insert(insertFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const update = async (req, res) => {
  try {
    const result = await DAL.update(updateFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const remove = async (req, res) => {
  try {
    const result = await DAL.remove(deleteFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const registro = async (req, res) => {
  try {
    const result = await DAL.register(registroFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(403).end()
  }
}
export const cambioPassword = async (req, res) => {
  try {
    const result = await DAL.change(cambioFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const olvidoPassword = async (req, res) => {
  try {
    const result = await DAL.forgot(olvidoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(403).end()
  }
}
export const perfil = async (req, res) => {
  try {
    const result = await DAL.profile(perfilFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
