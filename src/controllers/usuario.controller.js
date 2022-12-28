import * as DAL from '../models/usuario.model'

const insertFromRec = (req) => {
  const usuario = {
    nomusu: req.body.usuario.NOMUSU,
    ofiusu: req.body.usuario.OFIUSU,
    rolusu: req.body.usuario.ROLUSU,
    userid: req.body.usuario.USERID,
    emausu: req.body.usuario.EMAUSU,
    perusu: req.body.usuario.PERUSU,
    telusu: req.body.usuario.TELUSU,
    pwdusu: req.body.usuario.PWDUSU,
    stausu: req.body.usuario.STAUSU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(usuario, movimiento)
}
const updateFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.IDUSUA,
    nomusu: req.body.usuario.NOMUSU,
    ofiusu: req.body.usuario.OFIUSU,
    rolusu: req.body.usuario.ROLUSU,
    userid: req.body.usuario.USERID,
    emausu: req.body.usuario.EMAUSU,
    perusu: req.body.usuario.PERUSU,
    telusu: req.body.usuario.TELUSU,
    stausu: req.body.usuario.STAUSU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(usuario, movimiento)
}
const deleteFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(usuario, movimiento)
}
const cambioFromRec = (req) => {
  const cambio = {
    idusua: req.body.usuario.IDUSUA,
    pwdusu: req.body.usuario.PWDUSU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(cambio, movimiento)
}
const olvidoFromRec = (req) => {
  const usuario = {
    emausu: req.body.usuario.EMAUSU,
    pwdusu: req.body.usuario.PWDUSU,
    saltus: req.body.usuario.SALTUS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(usuario, movimiento)
}
const perfilFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.IDUSUA,
    nomusu: req.body.usuario.NOMUSU,
    emausu: req.body.usuario.EMAUSU,
    telusu: req.body.usuario.TELUSU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(usuario, movimiento)
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
    const rows = await DAL.find(context)

    if (rows.length === 1) {
      return res.status(200).json(rows[0])
    } else {
      return res.status(200).json(rows)
    }
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
export const cambio = async (req, res) => {
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
export const olvido = async (req, res) => {
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
