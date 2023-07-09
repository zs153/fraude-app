import axios from "axios";
import { estadosFraude, estadosSms, tiposMovimiento, tiposRol, estadosHito, estadosUsuario } from "../../public/js/enumeraciones";
import { serverAPI,puertoAPI } from '../../config/settings'

// pages fraude
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevs = cursor ? true : false
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes`, {
      context: {
        stafra: estadosFraude.pendientesAsignados,
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
        rest,        
      },
    });

    let fraudes = result.data.data
    let hasNexts = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDFRAU : fraudes[0].IDFRAU
      prevCursor = dir === 'next' ? fraudes[0].IDFRAU : fraudes[limit - 1].IDFRAU

      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDFRAU
      prevCursor = dir === 'next' ? fraudes[0]?.IDFRAU : 0

      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
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
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosFraude,
    };

    res.render("admin/fraudes", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
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
    });
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
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const resolverPage = async (req, res) => {
  const user = req.user;
  let hayLiquidacion = false;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/hito`, {
      context: {
        IDFRAU: req.params.id,
      },
    });

    let hitos = result.data
    if (hitos.stat) {
      const hayPropuestaLiquidacion = hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion);
      if (hayPropuestaLiquidacion) {
        if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.liquidacion)) {
          const msg =
            "Existe propuesta de liquidación sin su correspondiente liquidación.\nNo se puede resolver el fraude.";

          return res.render("user/error400", {
            alerts: [{ msg }],
          });
        }
      }
      hayLiquidacion = hitos.data.some((itm) => itm.STAHIT === estadosHito.liquidacion);
      if (hayLiquidacion) {
        if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion)) {
          const msg =
            "Existe liquidación sin su correspondiente propuesta de liquidación.\nNo se puede resolver el fraude.";

          return res.render("user/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const hayPropuestaSancion = hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaSancion);
      if (hayPropuestaSancion) {
        if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.sancion || itm.STAHIT === estadosHito.sancionAnulada)) {
          const msg =
            "Existe propuesta de sanción sin su correspondiente sanción o sanción anulada.\nNo se puede resolver el fraude.";

          return res.render("user/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const haySancion = hitos.data.some((itm) => itm.STAHIT === estadosHito.sancion);
      if (haySancion) {
        if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaSancion)) {
          const msg =
            "Existe sanción sin su correspondiente propuesta de sanción.\nNo se puede resolver el fraude.";

          return res.render("user/error400", {
            alerts: [{ msg }],
          });
        }
      }
    }

    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipos/cierre`, {
      context: {},
    });
    const fraude = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.params.id,
      },
    });
    const datos = {
      fraude: fraude.data.data[0],
      tipos: tipos.data.data,
      hayLiquidacion,
    };

    res.render("admin/fraudes/resolver", { user, datos });
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
  let hasPrevs = cursor ? true : false
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes`, {
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
    let hasNexts = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDFRAU : fraudes[0].IDFRAU
      prevCursor = dir === 'next' ? fraudes[0].IDFRAU : fraudes[limit - 1].IDFRAU

      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDFRAU
      prevCursor = dir === 'next' ? fraudes[0]?.IDFRAU : 0

      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
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
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosFraude,
    };

    res.render("admin/fraudes/resueltos", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const readonlyPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFORM: req.params.id,
      },
    })

    let fraude = result.data.data[0]
    fraude.FECFRA = fraude.FECFRA.slice(0,10).split('-').reverse().join('/')
    const datos = {
      fraude,
    }

    res.render("admin/fraude/readonly", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// page hitosevento
export const hitoseventosPage = async (req, res) => {
  const user = req.user;

  try {
    const fraude = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
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
      fraude: fraude.data.data[0],
      hitos: hitos.data.data,
      eventos: eventos.data.data,
      tiposHito: tiposHito.data.data,
      estadosHito,
    };

    res.render("admin/fraudes/hitoseventos", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
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

  try {
    const fraude = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
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
      fraude: fraude.data.data[0],
      hitos: hitos.data.data,
      eventos: eventos.data.data,
      estadosHito,
    };

    res.render("admin/fraudes/hitoseventos/readonly", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
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
  let hasPrevs = cursor ? true : false

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/smss`, {
      context: {
        fraude: req.params.id,        
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
      },
    })

    let smss = result.data.data
    let hasNexts = smss.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      nextCursor = dir === 'next' ? smss[limit - 1].IDSMSS : smss[0].IDSMSS
      prevCursor = dir === 'next' ? smss[0].IDSMSS : smss[limit - 1].IDSMSS

      smss.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : smss[0]?.IDSMSS
      prevCursor = dir === 'next' ? smss[0]?.IDSMSS : 0

      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
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
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),      
      estadosSms,
    }

    res.render("admin/fraudes/smss", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
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
        alerts: [{ msg: error.response.data.data }],
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
  let hasPrevs = cursor ? true : false

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/relaciones`, {
      context: {
        fraude: req.params.id,
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next:0, prev: 0},
        part,
      },
    })

    let relaciones = result.data.data
    let hasNexts = relaciones.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      nextCursor = dir === 'next' ? relaciones[limit - 1].IDRELA : relaciones[0].IDRELA
      prevCursor = dir === 'next' ? relaciones[0].IDRELA : relaciones[limit - 1].IDRELA

      relaciones.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : relaciones[0]?.IDRELA
      prevCursor = dir === 'next' ? relaciones[0]?.IDRELA : 0

      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
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
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render("admin/fraudes/relaciones", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
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
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// ades
export const adesPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevs = cursor ? true:false

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context: {
        oficina: user.rol === tiposRol.admin ? 0 : user.oficina,
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next:'', prev: ''},
        part,
      },
    })

    let usuarios = result.data.data
    let hasNexts = usuarios.length === limit +1
    let nextCursor = ''
    let prevCursor = ''
    
    if (hasNexts) {
      nextCursor= dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU

      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''
      
      if (cursor) {
        hasNexts = nextCursor === '' ? false : true
        hasPrevs = prevCursor === '' ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
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
      hasPrevs,
      hasNexts,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosUsuario,
    }

    res.render('admin/fraudes/ades', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
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
  let hasPrevs = cursor ? true : false
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes`, {
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
    let hasNexts = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      alerts = [{ msg: 'Se supera el límite de registros permitidos. Sólo se muestran los 100 primeros. Refine la consulta' }]      
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDFRAU : fraudes[0].IDFRAU
      prevCursor = dir === 'next' ? fraudes[0].IDFRAU : fraudes[limit - 1].IDFRAU
      
      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDFRAU
      prevCursor = dir === 'next' ? fraudes[0]?.IDFRAU : 0
      
      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
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
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    };

    res.render("admin/fraudes/ades/asignar", { user, alerts, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
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
  let hasPrevs = cursor ? true : false
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes`, {
      context: {
        liqfra: usuario.data.data[0].USERID,
        stafra: estadosFraude.asignado,
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
        rest,        
      },
    });

    let fraudes = result.data.data
    let hasNexts = fraudes.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      alerts = [{ msg: 'Se supera el límite de registros permitidos. Sólo se muestran los 100 primeros. Refine la consulta' }]      
      nextCursor = dir === 'next' ? fraudes[limit - 1].IDFRAU : fraudes[0].IDFRAU
      prevCursor = dir === 'next' ? fraudes[0].IDFRAU : fraudes[limit - 1].IDFRAU
      
      fraudes.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : fraudes[0]?.IDFRAU
      prevCursor = dir === 'next' ? fraudes[0]?.IDFRAU : 0
      
      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
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
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    };

    res.render("admin/fraudes/ades/desasignar", { user, alerts, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// fraude
export const update = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    REFFRA: req.body.reffra,
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
        alerts: [{ msg: error.response.data.data }],
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
    IDFRAU: req.body.id,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarFraude,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraude`, {
      context: {
        IDFRAU: req.body.id,
      }
    });

    if (result.data.stat) {
      if (result.data.data[0].FUNFRA === user.userid) {
        await axios.post(`http://${serverAPI}:${puertoAPI}/api/fraudes/delete`, {
          fraude,
          movimiento,
        });
    
        res.redirect(`/admin/faudes?part=${req.query.part}`);
      } else {
        throw "El documento no puede ser borrado."
      }
    } else {
      throw "El documento no existe."
    }
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
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

          return res.render("user/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const hayLiquidacion = hitos.some((itm) => itm.STAHIT === estadosHito.liquidacion);
      if (hayLiquidacion) {
        if (!hitos.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion)) {
          const msg =
            "Existe liquidación/es sin su correspondiente propuesta de liquidación.\nNo se puede resolver el fraude.";

          return res.render("user/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const hayPropuestaSancion = hitos.some((itm) => itm.STAHIT === estadosHito.propuestaSancion);
      if (hayPropuestaSancion) {
        if (!hitos.some((itm) => itm.STAHIT === estadosHito.sancion || itm.STAHIT === estadosHito.sancionAnulada)) {
          const msg =
            "Existe propuesta de sanción sin su correspondiente sanción o sanción anulada.\nNo se puede resolver el fraude.";

          return res.render("user/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const haySancion = hitos.some((itm) => itm.STAHIT === estadosHito.sancion);
      if (haySancion) {
        if (!hitos.some((itm) => itm.STAHIT === estadosHito.propuestaSancion)) {
          const msg =
            "Existe sanción sin su correspondiente propuesta de sanción.\nNo se puede resolver el fraude.";

          return res.render("user/error400", {
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
        alerts: [{ msg: error.response.data.data }],
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
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

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
        alerts: [{ msg: error.response.data.data }],
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
        alerts: [{ msg: error.response.data.data }],
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
