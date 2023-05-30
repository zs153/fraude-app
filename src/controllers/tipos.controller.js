import * as DAL from "../models/tipos.model";

export const cierre = async (req, res) => {
  const context = req.body.context;

  try {
    const result = await DAL.cierre(context);

    res.status(200).json(result)
  } catch (err) {
    res.status(500).end();
  }
};
export const cierres = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.cierres(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearCierre = async (req, res) => {
  // context
  const tipo = {
    destip: req.body.tipo.DESTIP,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.insertCierre(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const modificarCierre = async (req, res) => {
  // context
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
    destip: req.body.tipo.DESTIP,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.updateCierre(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const borrarCierre = async (req, res) => {
  // context
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.removeCierre(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};

export const evento = async (req, res) => {
  const context = req.body.context;

  try {
    const result = await DAL.evento(context);

    res.status(200).json(result)
  } catch (err) {
    res.status(500).end();
  }
};
export const eventos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.eventos(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearEvento = async (req, res) => {
  // context
  const tipo = {
    destip: req.body.tipo.DESTIP,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.insertEvento(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const modificarEvento = async (req, res) => {
  // context
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
    destip: req.body.tipo.DESTIP,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.updateEvento(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const borrarEvento = async (req, res) => {
  // context
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.removeEvento(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};

export const fraude = async (req, res) => {
  const context = req.body.context;

  try {
    const result = await DAL.fraude(context);

    res.status(200).json(result)
  } catch (err) {
    res.status(500).end();
  }
};
export const fraudes = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.fraudes(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearFraude = async (req, res) => {
  // context
  const tipo = {
    destip: req.body.tipo.DESTIP,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.insertFraude(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const modificarFraude = async (req, res) => {
  // context
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
    destip: req.body.tipo.DESTIP,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.updateFraude(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const borrarFraude = async (req, res) => {
  // context
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.removeFraude(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};

export const hito = async (req, res) => {
  const context = req.body.context;

  try {
    const result = await DAL.hito(context);

    res.status(200).json(result)
  } catch (err) {
    res.status(500).end();
  }
};
export const hitos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.hitos(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearHito = async (req, res) => {
  // context
  const tipo = {
    destip: req.body.tipo.DESTIP,
    anuhit: req.body.tipo.ANUHIT,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.insertHito(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const modificarHito = async (req, res) => {
  // context
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
    destip: req.body.tipo.DESTIP,
    anuhit: req.body.tipo.ANUHIT,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.updateHito(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
export const borrarHito = async (req, res) => {
  // context
  const tipo = {
    idtipo: req.body.tipo.IDTIPO,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };
  const context = Object.assign(tipo, movimiento)

  // proc
  try {
    const result = await DAL.removeHito(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
};
