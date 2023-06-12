import axios from "axios";
import { estadosFraude, estadosSms, tiposMovimiento, tiposRol, estadosHito, estadosUsuario } from "../../public/js/enumeraciones";
import { serverAPI,puertoAPI } from '../../config/settings'

// pages fraude
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevFras = cursor ? true : false
  let part = ''
  let rest = ''

  if (req.query.part) {
    const partes = req.query.part.split(',')

    part = partes[0].toUpperCase()
    if (partes.length > 1) {
      rest = partes[1].toUpperCase()
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/extended`, {
      context: {
        stafra: JSON.stringify(estadosFraude.pendiente),
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
        rest,        
      },
    });

    let fraudes = result.data.data
    let hasNextFras = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextFras) {
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDFRAU : fraudes[0].IDFRAU
      prevCursor = dir === 'next' ? fraudes[0].IDFRAU : fraudes[limit - 1].IDFRAU

      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDFRAU
      prevCursor = dir === 'next' ? fraudes[0]?.IDFRAU : 0

      if (cursor) {
        hasNextFras = nextCursor === 0 ? false : true
        hasPrevFras = prevCursor === 0 ? false : true
      } else {
        hasNextFras = false
        hasPrevFras = false
      }
    }

    if (dir === 'prev') {
      fraudes = fraudes.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      fraudes,
      hasNextFras,
      hasPrevFras,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosFraude,
    };

    res.render("admin/fraudes", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/fraude`, {
      context: {},
    })
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      context: {},
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.params.id,
      },
    });

    let fraude = result.data.data[0]
    fraude.FECFRA = fraude.FECFRA.slice(0, 10)
    const datos = {
      fraude,
      tipos: tipos.data.data,
      oficinas: oficinas.data.data,
      tiposRol,
    };

    res.render("admin/fraudes/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const resueltosPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevFras = cursor ? true : false
  let part = ''
  let rest = ''

  if (req.query.part) {
    const partes = req.query.part.split(',')

    part = partes[0].toUpperCase()
    if (partes.length > 1) {
      rest = partes[1].toUpperCase()
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/extended`, {
      context: {
        stafra: estadosFraude.resuelto,
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
        rest,        
      },
    });

    let fraudes = result.data.data
    let hasNextFras = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextFras) {
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDFRAU : fraudes[0].IDFRAU
      prevCursor = dir === 'next' ? fraudes[0].IDFRAU : fraudes[limit - 1].IDFRAU

      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDFRAU
      prevCursor = dir === 'next' ? fraudes[0]?.IDFRAU : 0

      if (cursor) {
        hasNextFras = nextCursor === 0 ? false : true
        hasPrevFras = prevCursor === 0 ? false : true
      } else {
        hasNextFras = false
        hasPrevFras = false
      }
    }

    if (dir === 'prev') {
      fraudes = fraudes.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      fraudes,
      hasNextFras,
      hasPrevFras,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosFraude,
    };

    res.render("admin/fraudes/resueltos", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// page hitosevento
export const hitoseventosPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };
  const tipo = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.params.id,
      },
    });
    const hitos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hito`, {
      context: {
        IDFRAU: req.params.id,
      },
    });
    const eventos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/evento`, {
      context: {
        IDFRAU: req.params.id,
      },
    });
    const tiposHito = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hito`, {
      context: {},
    });

    const datos = {
      fraude: result.data.data[0],
      hitos: hitos.data.data,
      eventos: eventos.data.data,
      tiposHito: tiposHito.data.data,
      estadosHito,
    };

    res.render("admin/fraudes/hitoseventos", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const hitoseventosReadonlyPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.params.id,
      },
    });
    const hitos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hito`, {
      context: {
        IDFRAU: req.params.id,
      },
    });
    const eventos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/evento`, {
      context: {
        IDFRAU: req.params.id,
      },
    });

    const datos = {
      fraude: result.data.data[0],
      hitos: hitos.data.data,
      eventos: eventos.data.data,
      estadosHito,
    };

    res.render("admin/fraudes/hitoseventos/readonly", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// pages hito
export const addHitosPage = async (req, res) => {
  const user = req.user;
  const arrTipos = []
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const hitos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hito`, {
      context: {
        IDFRAU: req.params.id,
      },
    });
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hito`, {
      context: {},
    });

    tipos.data.data.map((itm) => {
      if (hitos.data.data.find(ele => ele.TIPHIT === itm.IDTIPO)) {
        itm.DISABLED = true
      } else {
        itm.DISABLED = false
      }

      arrTipos.push(itm)
    });

    const datos = {
      fraude,
      tipos: arrTipos,
      estadosHito,
    };

    res.render("admin/fraudes/hitos/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const editHitosPage = async (req, res) => {
  const user = req.user;
  const arrTipos = []
  const fraude = {
    IDFRAU: req.params.idfra,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hito`, {
      context: {
        IDHITO: req.params.idhit,
      },
    });
    const hitos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hito`, {
      context: {
        IDFRAU: req.params.idfra,
      },
    });
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hito`, {
      context: {},
    });

    tipos.data.data.map((itm) => {
      if (hitos.data.data.find(ele => ele.TIPHIT === itm.IDTIPO)) {
        itm.DISABLED = true
      } else {
        itm.DISABLED = false
      }

      arrTipos.push(itm)
    });

    let hito = result.data.data[0]
    hito.IMPHIT = hito.IMPHIT.toLocaleString()

    const datos = {
      fraude,
      hito,
      tipos: arrTipos,
      estadosHito,
    };

    res.render("admin/fraudes/hitos/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// pages evento
export const addEventosPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/evento`, {
      context: {},
    });
    const datos = {
      fraude,
      tipos: tipos.data.data,
    };

    res.render("admin/fraudes/eventos/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const editEventosPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.idfra,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/evento`, {
      context: {
        IDEVEN: req.params.ideve,
      },
    });
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/evento`, {
      context: {},
    });

    const datos = {
      fraude,
      evento: result.data.data[0],
      tipos: tipos.data.data,
    };

    res.render("admin/fraudes/eventos/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// pages sms
export const smssPage = async (req, res) => {
  const user = req.user;

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevSms = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      fraude: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      fraude: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/smss`, {
      context,
    })

    let smss = result.data.data
    let hasNextSms = smss.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextSms) {
      nextCursor = dir === 'next' ? smss[limit - 1].IDSMSS : smss[0].IDSMSS
      prevCursor = dir === 'next' ? smss[0].IDSMSS : smss[limit - 1].IDSMSS

      smss.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : smss[0]?.IDSMSS
      prevCursor = dir === 'next' ? smss[0]?.IDSMSS : 0

      if (cursor) {
        hasNextSms = nextCursor === 0 ? false : true
        hasPrevSms = prevCursor === 0 ? false : true
      } else {
        hasNextSms = false
        hasPrevSms = false
      }
    }

    if (dir === 'prev') {
      smss = smss.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const fraude = {
      IDFRAU: req.params.id,
    };
    const datos = {
      fraude,
      smss,
      hasNextSms,
      hasPrevSms,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),      
      estadosSms,
    }

    res.render("admin/fraudes/smss", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const smssAddPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.params.id,
      },
    });
    const fraude = result.data.data[0]
    const sms = {
      MOVSMS: fraude.MOVCON,
    }
    const datos = {
      fraude,
      sms,
    };

    res.render("admin/fraudes/smss/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const smssEditPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.idfra,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/sms`, {
      context: {
        IDSMSS: req.params.idsms,
      },
    });
    const sms = result.data.data[0]
    const datos = {
      fraude,
      sms,
    };

    res.render("admin/fraudes/smss/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const smssReadonlyPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const smss = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/sms`, {
      context: {
        IDFRAU: req.params.id,
      },
    })

    const datos = {
      fraude,
      smss: smss.data.data,
      estadosSms,
    }

    res.render("admin/fraudes/smss/readonly", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// pag relacionados
export const relacionesPage = async (req, res) => {
  const user = req.user;

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevRela = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      fraude: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      fraude: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/relaciones`, {
      context,
    })

    let relaciones = result.data.data
    let hasNextRela = relaciones.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextRela) {
      nextCursor = dir === 'next' ? relaciones[limit - 1].IDRELA : relaciones[0].IDRELA
      prevCursor = dir === 'next' ? relaciones[0].IDRELA : relaciones[limit - 1].IDRELA

      relaciones.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : relaciones[0]?.IDRELA
      prevCursor = dir === 'next' ? relaciones[0]?.IDRELA : 0

      if (cursor) {
        hasNextRela = nextCursor === 0 ? false : true
        hasPrevRela = prevCursor === 0 ? false : true
      } else {
        hasNextRela = false
        hasPrevRela = false
      }
    }

    if (dir === 'prev') {
      relaciones = relaciones.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const fraude = {
      IDFRAU: req.params.id,
    };
    const datos = {
      fraude,
      relaciones,
      hasNextRela,
      hasPrevRela,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render("admin/fraudes/relaciones", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const relacionesAddPage = async (req, res) => {
  const user = req.user;
  let fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const datos = {
      fraude,
    };

    res.render("admin/fraudes/relaciones/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const relacionesEditPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.idfra,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/relacion`, {
      context: {
        IDRELA: req.params.idrel,
      },
    });

    const datos = {
      fraude,
      relacion: result.data.data[0],
    };

    res.render("admin/fraudes/relaciones/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const relacionesReadonlyPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const relaciones = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/relacion`, {
      context: {
        IDFRAU: req.params.id,
      },
    })

    const datos = {
      fraude,
      relaciones: relaciones.data.data,
    }

    res.render("admin/fraudes/relaciones/readonly", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// pages otros
export const addEjercicioPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.params.id,
      },
    });

    let fraude = result.data.data[0]
    fraude.EJEFRA = fecha.getFullYear()

    const datos = {
      fraude,
    };

    res.render("admin/fraudes/ejercicios/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// ades
export const adesPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevUsers = cursor ? true:false
  let context = {}

  if (cursor) {
    context = {
      oficina: user.rol === tiposRol.admin ? 0 : user.oficina,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      oficina: user.rol === tiposRol.admin ? 0 : user.oficina,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit +1
    let nextCursor = ''
    let prevCursor = ''
    
    if (hasNextUsers) {
      nextCursor= dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU

      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''
      
      if (cursor) {
        hasNextUsers = nextCursor === '' ? false : true
        hasPrevUsers = prevCursor === '' ? false : true
      } else {
        hasNextUsers = false
        hasPrevUsers = false
      }
    }

    if (dir === 'prev') {
      usuarios = usuarios.sort((a,b) => a.NOMUSU > b.NOMUSU ? 1:-1)
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }    
    const datos = {
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosUsuario,
    }

    res.render('admin/fraudes/ades', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const adesAsignarPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 100

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevFras = cursor ? true : false
  let part = ''
  let rest = ''
  let alerts = undefined

  if (req.query.part) {
    const partes = req.query.part.split(',')

    part = partes[0].toUpperCase()
    if (partes.length > 1) {
      rest = partes[1].toUpperCase()
    }
  }
  
  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context: {
        IDUSUA: req.params.id,
      },
    });
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/extended`, {
      context: {
        stafra: JSON.stringify(estadosFraude.pendiente),
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
        rest,        
      },
    });

    let fraudes = result.data.data
    let hasNextFras = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextFras) {
      alerts = [{ msg: 'Se supera el límite de registros permitidos. Sólo se muestran los 100 primeros registros. Refine la consulta' }]      
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDFRAU : fraudes[0].IDFRAU
      prevCursor = dir === 'next' ? fraudes[0].IDFRAU : fraudes[limit - 1].IDFRAU
      
      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDFRAU
      prevCursor = dir === 'next' ? fraudes[0]?.IDFRAU : 0
      
      if (cursor) {
        hasNextFras = nextCursor === 0 ? false : true
        hasPrevFras = prevCursor === 0 ? false : true
      } else {
        hasNextFras = false
        hasPrevFras = false
      }
    }
    
    if (dir === 'prev') {
      fraudes = fraudes.reverse()
    }
    
    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    
    const datos = {
      usuario: usuario.data.data[0],
      fraudes,
      hasNextFras,
      hasPrevFras,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    };

    res.render("admin/fraudes/ades/asignar", { user, alerts, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const adesDesasignarPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 100

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevFras = cursor ? true : false
  let part = ''
  let rest = ''
  let alerts = undefined

  if (req.query.part) {
    const partes = req.query.part.split(',')

    part = partes[0].toUpperCase()
    if (partes.length > 1) {
      rest = partes[1].toUpperCase()
    }
  }
  
  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context: {
        IDUSUA: req.params.id,
      },
    });
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/extended`, {
      context: {
        liqfra: usuario.data.data[0].USERID,
        stafra: JSON.stringify(estadosFraude.asignado),
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
        rest,        
      },
    });

    let fraudes = result.data.data
    let hasNextFras = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextFras) {
      alerts = [{ msg: 'Se supera el límite de registros permitidos. Sólo se muestran los 100 primeros registros. Refine la consulta' }]      
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDFRAU : fraudes[0].IDFRAU
      prevCursor = dir === 'next' ? fraudes[0].IDFRAU : fraudes[limit - 1].IDFRAU
      
      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDFRAU
      prevCursor = dir === 'next' ? fraudes[0]?.IDFRAU : 0
      
      if (cursor) {
        hasNextFras = nextCursor === 0 ? false : true
        hasPrevFras = prevCursor === 0 ? false : true
      } else {
        hasNextFras = false
        hasPrevFras = false
      }
    }
    
    if (dir === 'prev') {
      fraudes = fraudes.reverse()
    }
    
    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    
    const datos = {
      usuario: usuario.data.data[0],
      fraudes,
      hasNextFras,
      hasPrevFras,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    };

    res.render("admin/fraudes/ades/desasignar", { user, alerts, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// procs fraude
export const insert = async (req, res) => {
  const user = req.user;
  const referencia = "F" + randomString(10, "1234567890YMGS");
  const fraude = {
    FECFRA: req.body.fecfra,
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    REFFRA: referencia,
    TIPFRA: req.body.tipfra,
    EJEFRA: req.body.ejefra,
    OFIFRA: req.body.ofifra,
    OBSFRA: req.body.obsfra,
    FUNFRA: req.body.funfra,
    LIQFRA: user.userid,
    STAFRA: estadosFraude.asignado,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearFraude,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/insert`, {
      fraude,
      movimiento,
    });

    res.redirect(`/admin/fraudes?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const update = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
    FECFRA: req.body.fecfra,
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    TIPFRA: req.body.tipfra,
    EJEFRA: req.body.ejefra,
    OFIFRA: req.body.ofifra,
    OBSFRA: req.body.obsfra,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarFraude,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/update`, {
      fraude,
      movimiento,
    });

    res.redirect(`/admin/fraudes?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const remove = async (req, res) => { 
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarFraude,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.body.idfrau,
      }
    });

    if (result.data.stat) {
      if (result.data.data[0].FUNFRA === user.userid) {
        await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/delete`, {
          fraude,
          movimiento,
        });
    
        res.redirect(`/admin/fraudes?part=${req.query.part}`);
      } else {
        throw "El documento no puede ser borrado."
      }
    } else {
      throw "El documento no existe."
    }
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const asignar = async (req, res) => {
  const user = req.user;
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.asignarFraude,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.body.idfrau,
      },
    });

    let fraude = result.data.data[0]
    if (fraude.STAFRA === estadosFraude.pendiente) {
      fraude.LIQFRA = user.userid
      fraude.STAFRA = estadosFraude.asignado
        
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/asign`, {
        fraude,
        movimiento,
      });
    }

    res.redirect(`/admin/fraudes?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const resolver = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.body.idfrau,
      },
    });

    let fraude = result.data.data[0]
    if (fraude.STAFRA === estadosFraude.asignado) {
      const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hito`, {
        context: {
          IDFRAU: req.body.idfrau,
        }
      });

      const hitos = result.data.data
      const hayPropuestaLiquidacion = hitos.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion);
      if (hayPropuestaLiquidacion) {
        if (!hitos.some((itm) => itm.STAHIT === estadosHito.liquidacion)) {
          const msg =
            "Existe propuesta de liquidación sin su correspondiente liquidación.\nNo se puede resolver el fraude.";

          return res.render("admin/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const hayLiquidacion = hitos.some((itm) => itm.STAHIT === estadosHito.liquidacion);
      if (hayLiquidacion) {
        if (!hitos.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion)) {
          const msg =
            "Existe liquidación/es sin su correspondiente propuesta de liquidación.\nNo se puede resolver el fraude.";

          return res.render("admin/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const hayPropuestaSancion = hitos.some((itm) => itm.STAHIT === estadosHito.propuestaSancion);
      if (hayPropuestaSancion) {
        if (!hitos.some((itm) => itm.STAHIT === estadosHito.sancion || itm.STAHIT === estadosHito.sancionAnulada)) {
          const msg =
            "Existe propuesta de sanción sin su correspondiente sanción o sanción anulada.\nNo se puede resolver el fraude.";

          return res.render("admin/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const haySancion = hitos.some((itm) => itm.STAHIT === estadosHito.sancion);
      if (haySancion) {
        if (!hitos.some((itm) => itm.STAHIT === estadosHito.propuestaSancion)) {
          const msg =
            "Existe sanción sin su correspondiente propuesta de sanción.\nNo se puede resolver el fraude.";

          return res.render("admin/error400", {
            alerts: [{ msg }],
          });
        }
      }

      fraude.LIQFRA = user.userid
      fraude.STAFRA = estadosFraude.resuelto
      const cierre = {
        REFFRA: fraude.REFFRA,
        SITCIE: req.body.sitcie
      }
      const movimiento = {
        USUMOV: user.id,
        TIPMOV: tiposMovimiento.resolverFraude,
      };
    
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/cierre`, {
        fraude,
        cierre,
        movimiento,
      });
    }

    res.redirect(`/admin/fraudes?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const desasignar = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context : {
        IDFRAU: req.body.idfrau,
      },
    });
    
    let fraude = result.data.data[0]
    if (fraude.STAFRA === estadosFraude.asignado) {
      fraude.LIQFRA = "PEND"
      fraude.STAFRA = estadosFraude.pendiente
      
      const movimiento = {
        USUMOV: user.id,
        TIPMOV: tiposMovimiento.desasignarFraude,
      };
      
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/unasign`, {
        fraude,
        movimiento,
      });
    }

    res.redirect(`/admin/fraudes?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// proc hito
export const insertHito = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const hito = {
    TIPHIT: req.body.tiphit,
    IMPHIT: req.body.imphit ? req.body.imphit : 0,
    OBSHIT: req.body.obshit,
    STAHIT: req.body.anuhit,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearHito,
  };
  const generaLiq = req.body.genliq;
  const generaSan = req.body.gensan;

  try {
    if (parseInt(generaLiq) === 1) {
      const tipoHito = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hito`, {
        context: {
          IDTIPO: estadosHito.liquidacion,
        },
      });
      const liquidacion = {
        TIPLIQ: tipoHito.data.data[0].IDTIPO,
        IMPLIQ: hito.IMPHIT,
        OBSLIQ: '',
        STALIQ: tipoHito.data.data[0].ANUHIT,
      }

      await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hitos/insertliq`, {
        fraude,
        hito,
        liquidacion,
        movimiento,
      });
    } else if (parseInt(generaSan) === 1) {
      const tipoHito = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/hito`, {
        context: {
          IDTIPO: estadosHito.sancion,
        },
      });
      const sancion = {
        TIPSAN: tipoHito.data.data[0].IDTIPO,
        IMPSAN: hito.IMPHIT,
        OBSSAN: '',
        STASAN: tipoHito.data.data[0].ANUHIT,
      }
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hitos/insertsan`, {
        fraude,
        hito,
        sancion,
        movimiento,
      });
    } else {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hitos/insert`, {
        fraude,
        hito,
        movimiento,
      });
    }

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const updateHito = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const hito = {
    IDHITO: req.body.idhito,
    TIPHIT: req.body.tiphit,
    IMPHIT: req.body.imphit, //parseFloat(req.body.imphit.replace(/,/g, '.')),
    OBSHIT: req.body.obshit,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarHito,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hitos/update`, {
      hito,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const removeHito = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const hito = {
    IDHITO: req.body.idhito,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarHito,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hitos/delete`, {
      fraude,
      hito,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const archivoHito = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const hito = {
    IDHITO: req.body.idhito,
    STAHIT: estadosHito.sancionAnulada,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.archivadoSancion,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hitos/archivado`, {
      hito,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// proc evento
export const insertEvento = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const evento = {
    TIPEVE: req.body.tipeve,
    OBSEVE: req.body.obseve,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEvento,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/eventos/insert`, {
      fraude,
      evento,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const updateEvento = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const evento = {
    IDEVEN: req.body.ideven,
    TIPEVE: req.body.tipeve,
    OBSEVE: req.body.obseve,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarEvento,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/eventos/update`, {
      evento,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const removeEvento = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const evento = {
    IDEVEN: req.body.ideven,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarEvento,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/eventos/delete`, {
      fraude,
      evento,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// proc ejercicio
export const insertEjercicio = async (req, res) => {
  const user = req.user;
  const fecha = new Date()
  const fraude = {
    FECFRA: fecha.toISOString().substring(0, 10),
    NIFCON: req.body.nifcon,
    NOMCON: req.body.nomcon,
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    REFFRA: req.body.reffra,
    TIPFRA: req.body.tipfra,
    EJEFRA: req.body.ejefra,
    OFIFRA: user.oficina,
    OBSFRA: req.body.obsfra,
    FUNFRA: user.userid,
    LIQFRA: user.userid,
    STAFRA: estadosFraude.asignado,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEjercicio,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/insert`, {
      fraude,
      movimiento,
    });

    res.redirect(`/admin/fraudes?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// proc sms
export const insertSms = async (req, res) => {
  const user = req.user;
  const fecha = new Date()
  const fraude = {
    IDFRAU: req.body.idfrau,
  }
  const sms = {
    FECSMS: fecha.toISOString().substring(0, 10),
    TEXSMS: req.body.texsms,
    MOVSMS: req.body.movsms,
    STASMS: estadosSms.pendiente,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearSms,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/smss/insert`, {
      fraude,
      sms,
      movimiento,
    });

    res.redirect(`/admin/fraudes/smss/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const updateSms = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  }
  const sms = {
    IDSMSS: req.body.idsmss,
    FECSMS: new Date().toISOString().slice(0, 10),
    TEXSMS: req.body.texsms,
    MOVSMS: req.body.movsms,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarSms,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/smss/update`, {
      sms,
      movimiento,
    });

    res.redirect(`/admin/fraudes/smss/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const removeSms = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  }
  const sms = {
    IDSMSS: req.body.idsmss,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarSms,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/smss/delete`, {
      fraude,
      sms,
      movimiento,
    });

    res.redirect(`/admin/fraudes/smss/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc relacion
export const insertRelacion = async (req, res) => {
  const user = req.user;
  const fecha = new Date()
  const fraude = {
    IDFRAU: req.body.idfrau,
  }
  const relacion = {
    FECREL: fecha.toISOString().substring(0, 10),
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearRelacion,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/relaciones/insert`, {
      fraude,
      relacion,
      movimiento,
    });

    res.redirect(`/admin/fraudes/relaciones/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const updateRelacion = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const relacion = {
    IDRELA: req.body.idrela,
    FECREL: new Date().toISOString().slice(0, 10),
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarRelacion,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/relaciones/update`, {
      relacion,
      movimiento,
    });

    res.redirect(`/admin/fraudes/relaciones/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const removeRelacion = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  }
  const relacion = {
    IDRELA: req.body.idrela,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarRelacion,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/relaciones/delete`, {
      fraude,
      relacion,
      movimiento,
    });

    res.redirect(`/admin/fraudes/relaciones/${fraude.IDFRAU}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// ades
export const asignarFraudes = async (req, res) => {
  const user = req.user;
  const fraude = {
    LIQFRA: req.body.userid,
    STAFRA: estadosFraude.asignado,
  }
  const fraudes = {
    ARRFRA: JSON.parse(req.body.arrfra)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.asignarFraude,
  }

  try {
    if (fraudes.ARRFRA.length === 0) {
      throw "No se han seleccionado registros para procesar."
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/ades/asignar`, {
      fraude,
      fraudes,
      movimiento,
    });

    res.redirect(`/admin/fraudes/ades?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const desAsignarFraudes = async (req, res) => {
  const user = req.user;
  const fraude = {
    LIQFRA: 'PEND',
    STAFRA: estadosFraude.pendiente,
  }
  const fraudes = {
    ARRFRA: JSON.parse(req.body.arrfra)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.asignarFraude,
  }
  
  try {
    if (fraudes.ARRFRA.length === 0) {
      throw "No se han seleccionado registros para procesar."
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/ades/desasignar`, {
      fraude,
      fraudes,
      movimiento,
    });
    
    res.redirect(`/admin/fraudes/ades?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// helpers
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}
const randomString = (long, chars) => {
  let result = "";
  for (let i = long; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
