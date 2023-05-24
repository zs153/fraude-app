import axios from "axios";
import {
  estadosFraude,
  estadosSms,
  tiposMovimiento,
  tiposRol,
  estadosHito,
} from "../../public/js/enumeraciones";
import { serverAPI } from '../../config/settings'

// pages fraude
export const mainPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    LIQFRA: user.userid,
    STAFRA: estadosFraude.pendiente + estadosFraude.asignado,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraudes`, {
      fraude,
    });
    const datos = {
      fraudes: result.data,
      estadosFraude,
      verTodo: false,
    };

    res.render("admin/fraudes", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();
  const fraude = {
    ISOFEC: fecha.toISOString().slice(0, 10),
    EJEFRA: fecha.getFullYear() - 1,
    OFIFRA: user.oficina,
    FUNFRA: userid,
  };
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: user.oficina }
  const tipo = {}

  try {
    const tipos = await axios.post(`http://${serverAPI}:8100/api/tipos/fraudes`, {
      tipo,
    })
    const oficinas = await axios.post(`http://${serverAPI}:8100/api/oficinas`, {
      oficina,
    })
    const datos = {
      fraude,
      tipos: tipos.data,
      oficinas: oficinas.data,
    };

    res.render("admin/fraudes/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editPage = async (req, res) => {
  const user = req.user;
  let fraude = {
    IDFRAU: req.params.id,
  };
  const tipo = {}
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: user.oficina }

  try {
    const tipos = await axios.post(`http://${serverAPI}:8100/api/tipos/fraudes`, {
      tipo,
    })
    const oficinas = await axios.post(`http://${serverAPI}:8100/api/oficinas`, {
      oficina,
    })
    const result = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    });

    fraude = result.data
    fraude.ISOFEC = fraude.FECFRA.slice(0, 10)
    const datos = {
      fraude,
      tipos: tipos.data,
      oficinas: oficinas.data,
      tiposRol,
    };

    res.render("admin/fraudes/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const resolverPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };
  const tipo = {}

  try {
    const hitos = await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos`, {
      fraude,
    });

    const hayPropuestaLiquidacion = hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion);
    if (hayPropuestaLiquidacion) {
      if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.liquidacion)) {
        const msg =
          "Existe propuesta de liquidación sin su correspondiente liquidación.\nNo se puede resolver el fraude.";

        return res.render("admin/error400", {
          alerts: [{ msg }],
        });
      }
    }
    const hayLiquidacion = hitos.data.some((itm) => itm.STAHIT === estadosHito.liquidacion);
    if (hayLiquidacion) {
      if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion)) {
        const msg =
          "Existe liquidación sin su correspondiente propuesta de liquidación.\nNo se puede resolver el fraude.";

        return res.render("admin/error400", {
          alerts: [{ msg }],
        });
      }
    }
    const hayPropuestaSancion = hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaSancion);
    if (hayPropuestaSancion) {
      if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.sancion || itm.STAHIT === estadosHito.sancionAnulada)) {
        const msg =
          "Existe propuesta de sanción sin su correspondiente sanción o sanción anulada.\nNo se puede resolver el fraude.";

        return res.render("admin/error400", {
          alerts: [{ msg }],
        });
      }
    }
    const haySancion = hitos.data.some((itm) => itm.STAHIT === estadosHito.sancion);
    if (haySancion) {
      if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaSancion)) {
        const msg =
          "Existe sanción sin su correspondiente propuesta de sanción.\nNo se puede resolver el fraude.";

        return res.render("admin/error400", {
          alerts: [{ msg }],
        });
      }
    }

    const tipos = await axios.post(`http://${serverAPI}:8100/api/tipos/cierres`, {
      tipo,
    });
    const result = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    });
    const datos = {
      fraude: result.data,
      tipos: tipos.data,
      hayLiquidacion,
    };

    res.render("admin/fraudes/resolver", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    const result = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    });
    const hitos = await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos`, {
      fraude,
    });
    const eventos = await axios.post(`http://${serverAPI}:8100/api/fraudes/eventos`, {
      fraude,
    });
    const tiposHito = await axios.post(`http://${serverAPI}:8100/api/tipos/hitos`, {
      tipo,
    });

    const datos = {
      fraude: result.data,
      hitos: hitos.data,
      eventos: eventos.data,
      tiposHito: tiposHito.data,
      estadosHito,
    };

    res.render("admin/fraudes/hitoseventos", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los hitos del fraude seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const hitoseventosReadonlyPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraudes/extended`, {
      fraude,
    });

    const datos = {
      detalle: result.data,
      estadosHito,
    };

    res.render("admin/fraudes/hitoseventos/readonly", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los hitos del fraude seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

// pages hito
export const addHitosPage = async (req, res) => {
  const user = req.user;
  const arrTipos = []
  const fraude = {
    IDFRAU: req.params.id,
  };
  const tipo = {}

  try {
    const hitos = await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos`, {
      fraude,
    });
    const tipos = await axios.post(`http://${serverAPI}:8100/api/tipos/hitos`, {
      tipo,
    });

    tipos.data.map((itm) => {
      if (hitos.data.find(ele => ele.TIPHIT === itm.IDTIPO)) {
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
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editHitosPage = async (req, res) => {
  const user = req.user;
  const arrTipos = []
  const tipo = {}
  const fraude = {
    IDFRAU: req.params.idfra,
  };
  let hito = {
    IDHITO: req.params.idhit,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraudes/hito`, {
      hito,
    });
    const hitos = await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos`, {
      fraude,
    });
    const tipos = await axios.post(`http://${serverAPI}:8100/api/tipos/hitos`, {
      tipo,
    });

    tipos.data.map((itm) => {
      if (hitos.data.find(ele => ele.TIPHIT === itm.IDTIPO)) {
        itm.DISABLED = true
      } else {
        itm.DISABLED = false
      }

      arrTipos.push(itm)
    });

    hito = result.data
    hito.IMPHIT = result.data.IMPHIT.toLocaleString()

    const datos = {
      fraude,
      hito,
      tipos: arrTipos,
      estadosHito,
    };

    res.render("admin/fraudes/hitos/edit", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

// pages evento
export const addEventosPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };
  const tipo = {}

  try {
    const tipos = await axios.post(`http://${serverAPI}:8100/api/tipos/eventos`, {
      tipo,
    });
    const datos = {
      fraude,
      tipos: tipos.data,
    };

    res.render("admin/fraudes/eventos/add", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editEventosPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.idfra,
  };
  const evento = {
    IDEVEN: req.params.ideve,
  };
  const tipo = {}

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraudes/evento`, {
      evento,
    });
    const tipos = await axios.post(`http://${serverAPI}:8100/api/tipos/eventos`, {
      tipo,
    });

    const datos = {
      fraude,
      evento: result.data,
      tipos: tipos.data,
    };

    res.render("admin/fraudes/eventos/edit", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

// pages sms
export const smssPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const ret = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    })
    const smss = await axios.post(`http://${serverAPI}:8100/api/fraudes/smss`, {
      fraude,
    })

    const fraudeData = {
      NIFCON: ret.data.NIFCON,
      NOMCON: ret.data.NOMCON,
      EJEFRA: ret.data.EJEFRA,
    }
    const datos = {
      fraude,
      fraudeData,
      smss: smss.data,
      estadosSms,
    }

    res.render("admin/fraudes/smss", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const smssAddPage = async (req, res) => {
  const user = req.user;
  let fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    });
    const sms = {
      MOVSMS: result.data.MOVCON,
    }
    const datos = {
      fraude,
      sms,
    };

    res.render("admin/fraudes/smss/add", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const smssEditPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.idfra,
  }
  const sms = {
    IDSMSS: req.params.idsms,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraudes/sms`, {
      sms,
    });
    const datos = {
      fraude,
      sms: result.data,
    };

    res.render("admin/fraudes/smss/edit", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const smssReadonlyPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const ret = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    })
    const smss = await axios.post(`http://${serverAPI}:8100/api/fraudes/smss`, {
      fraude,
    })

    const fraudeData = {
      NIFCON: ret.data.NIFCON,
      NOMCON: ret.data.NOMCON,
      EJEFRA: ret.data.EJEFRA,
    }
    const datos = {
      fraude,
      fraudeData,
      smss: smss.data,
      estadosSms,
    }

    res.render("admin/fraudes/smss/readonly", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// pag relacionados
export const relacionesPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const ret = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    })
    const relaciones = await axios.post(`http://${serverAPI}:8100/api/fraudes/relaciones`, {
      fraude,
    })

    const fraudeData = {
      NIFCON: ret.data.NIFCON,
      NOMCON: ret.data.NOMCON,
      EJEFRA: ret.data.EJEFRA,
    }
    const datos = {
      fraude,
      fraudeData,
      relaciones: relaciones.data,
    }

    res.render("admin/fraudes/relaciones", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const relacionesEditPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.idfra,
  }
  const relacion = {
    IDRELA: req.params.idrel,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraudes/relacion`, {
      relacion,
    });
    const datos = {
      fraude,
      relacion: result.data,
    };

    res.render("admin/fraudes/relaciones/edit", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const relacionesReadonlyPage = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const ret = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    })
    const relaciones = await axios.post(`http://${serverAPI}:8100/api/fraudes/relaciones`, {
      fraude,
    })

    const fraudeData = {
      NIFCON: ret.data.NIFCON,
      NOMCON: ret.data.NOMCON,
      EJEFRA: ret.data.EJEFRA,
    }
    const datos = {
      fraude,
      fraudeData,
      relaciones: relaciones.data,
      estadosSms,
    }

    res.render("admin/fraudes/relaciones/readonly", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// pages otros
export const ejercicioPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();
  let fraude = {
    IDFRAU: req.params.id,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    });

    fraude = result.data
    fraude.EJEFRA = fecha.getFullYear()

    const datos = {
      fraude,
    };

    res.render("admin/fraudes/ejercicio", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/insert`, {
      fraude,
      movimiento,
    });

    res.redirect("/admin/fraudes");
  } catch (error) {
    let msg = "No se ha podido crear el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/update`, {
      fraude,
      movimiento,
    });

    res.redirect("/admin/fraudes");
  } catch (error) {
    let msg = "No se ha podido actualizar el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/delete`, {
      fraude,
      movimiento,
    });

    res.redirect("/admin/fraudes");
  } catch (error) {
    const msg = "No se ha podido elminar el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const asignar = async (req, res) => {
  const user = req.user;
  let fraude = {
    IDFRAU: req.body.idfrau,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    });

    fraude.LIQFRA = user.userid
    fraude.STAFRA = estadosFraude.asignado
    const movimiento = {
      USUMOV: user.id,
      TIPMOV: tiposMovimiento.asignarFraude,
    };

    if (result.data.STAFRA === estadosFraude.pendiente) {
      await axios.post(`http://${serverAPI}:8100/api/fraudes/asign`, {
        fraude,
        movimiento,
      });

      res.redirect("/admin/fraudes");
    }
  } catch (error) {
    const msg = "No se ha podido asignar el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const resolver = async (req, res) => {
  const user = req.user;
  let fraude = {
    IDFRAU: req.body.idfrau,
  };
  const cierre = {
    REFFRA: req.body.reffra,
    SITCIE: req.body.sitcie
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.resolverFraude,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    });

    if (result.data.STAFRA === estadosFraude.asignado) {
      const hitos = await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos`, {
        fraude,
      });

      const hayPropuestaLiquidacion = hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion);
      if (hayPropuestaLiquidacion) {
        if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.liquidacion)) {
          const msg =
            "Existe propuesta de liquidación sin su correspondiente liquidación.\nNo se puede resolver el fraude.";

          return res.render("admin/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const hayLiquidacion = hitos.data.some((itm) => itm.STAHIT === estadosHito.liquidacion);
      if (hayLiquidacion) {
        if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaLiquidacion)) {
          const msg =
            "Existe liquidación/es sin su correspondiente propuesta de liquidación.\nNo se puede resolver el fraude.";

          return res.render("admin/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const hayPropuestaSancion = hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaSancion);
      if (hayPropuestaSancion) {
        if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.sancion || itm.STAHIT === estadosHito.sancionAnulada)) {
          const msg =
            "Existe propuesta de sanción sin su correspondiente sanción o sanción anulada.\nNo se puede resolver el fraude.";

          return res.render("admin/error400", {
            alerts: [{ msg }],
          });
        }
      }
      const haySancion = hitos.data.some((itm) => itm.STAHIT === estadosHito.sancion);
      if (haySancion) {
        if (!hitos.data.some((itm) => itm.STAHIT === estadosHito.propuestaSancion)) {
          const msg =
            "Existe sanción sin su correspondiente propuesta de sanción.\nNo se puede resolver el fraude.";

          return res.render("admin/error400", {
            alerts: [{ msg }],
          });
        }
      }

      fraude.LIQFRA = user.userid
      fraude.STAFRA = estadosFraude.resuelto

      await axios.post(`http://${serverAPI}:8100/api/fraudes/cierre`, {
        fraude,
        cierre,
        movimiento,
      });
    }

    res.redirect("/admin/fraudes");
  } catch (error) {
    const msg = "No se ha podido resolver el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const desasignar = async (req, res) => {
  const user = req.user;
  let fraude = {
    IDFRAU: req.body.idfrau,
  };

  try {
    const resul = await axios.post(`http://${serverAPI}:8100/api/fraude`, {
      fraude,
    });

    if (resul.data.STAFRA === estadosFraude.asignado) {
      fraude.LIQFRA = "PEND"
      fraude.STAFRA = estadosFraude.pendiente
      const movimiento = {
        USUMOV: user.id,
        TIPMOV: tiposMovimiento.desasignarFraude,
      };

      await axios.post(`http://${serverAPI}:8100/api/fraudes/unasign`, {
        fraude,
        movimiento,
      });
    }

    res.redirect("/admin/fraudes");
  } catch (error) {
    const msg = "No se ha podido desasignar el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const ejercicio = async (req, res) => {
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/insert`, {
      fraude,
      movimiento,
    });

    res.redirect("/admin/fraudes");
  } catch (error) {
    const msg = "No se ha podido insertar el ejercicio.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
      const tipo = {
        IDTIPO: estadosHito.liquidacion,
      }
      const tipoHito = await axios.post(`http://${serverAPI}:8100/api/tipos/hito`, {
        tipo,
      });
      const liquidacion = {
        TIPLIQ: tipoHito.data.IDTIPO,
        IMPLIQ: hito.IMPHIT,
        OBSLIQ: '',
        STALIQ: tipoHito.data.ANUHIT,
      }

      await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos/insertliq`, {
        fraude,
        hito,
        liquidacion,
        movimiento,
      });
    } else if (parseInt(generaSan) === 1) {
      const tipo = {
        IDTIPO: estadosHito.sancion,
      }
      const tipoHito = await axios.post(`http://${serverAPI}:8100/api/tipos/hito`, {
        tipo,
      });
      const sancion = {
        TIPSAN: tipoHito.data.IDTIPO,
        IMPSAN: hito.IMPHIT,
        OBSSAN: '',
        STASAN: tipoHito.data.ANUHIT,
      }
      await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos/insertsan`, {
        fraude,
        hito,
        sancion,
        movimiento,
      });
    } else {
      await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos/insert`, {
        fraude,
        hito,
        movimiento,
      });
    }

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido insertar el hito.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updateHito = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const hito = {
    IDHITO: req.body.idhito,
    FECHIT: new Date().toISOString().slice(0, 10),
    TIPHIT: req.body.tiphit,
    IMPHIT: req.body.imphit, //parseFloat(req.body.imphit.replace(/,/g, '.')),
    OBSHIT: req.body.obshit,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarHito,
  };

  try {
    await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos/update`, {
      hito,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido actualizar el hito.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos/delete`, {
      fraude,
      hito,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido acceder borrar el hito.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/hitos/archivado`, {
      hito,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido acceder borrar el hito.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

// proc evento
export const insertEvento = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const evento = {
    FECEVE: new Date().toISOString().slice(0, 10),
    TIPEVE: req.body.tipeve,
    OBSEVE: req.body.obseve,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEvento,
  };

  try {
    await axios.post(`http://${serverAPI}:8100/api/fraudes/eventos/insert`, {
      fraude,
      evento,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido insertar el evento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updateEvento = async (req, res) => {
  const user = req.user;
  const fraude = {
    IDFRAU: req.body.idfrau,
  };
  const evento = {
    IDEVEN: req.body.ideven,
    FECEVE: new Date().toISOString().slice(0, 10),
    TIPEVE: req.body.tipeve,
    OBSEVE: req.body.obseve,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarEvento,
  };

  try {
    await axios.post(`http://${serverAPI}:8100/api/fraudes/eventos/update`, {
      evento,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido actualizar el evento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/eventos/delete`, {
      fraude,
      evento,
      movimiento,
    });

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido acceder borrar el evento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/smss/insert`, {
      fraude,
      sms,
      movimiento,
    });

    res.redirect(`/admin/fraudes/smss/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido insertar el ejercicio.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/smss/update`, {
      sms,
      movimiento,
    });

    res.redirect(`/admin/fraudes/smss/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido actualizar el sms.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/smss/delete`, {
      fraude,
      sms,
      movimiento,
    });

    res.redirect(`/admin/fraudes/smss/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido borrar el sms.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/relaciones/insert`, {
      fraude,
      relacion,
      movimiento,
    });

    res.redirect(`/admin/fraudes/relaciones/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido insertar el ejercicio.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/relaciones/update`, {
      relacion,
      movimiento,
    });

    res.redirect(`/admin/fraudes/relaciones/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido actualizar la relación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:8100/api/fraudes/relaciones/delete`, {
      fraude,
      relacion,
      movimiento,
    });

    res.redirect(`/admin/fraudes/relaciones/${fraude.IDFRAU}`);
  } catch (error) {
    const msg = "No se ha podido enviar el sms.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// proc otros
export const verTodo = async (req, res) => {
  const user = req.user;
  const fraude = {
    LIQFRA: user.userid,
    STAFRA: estadosFraude.resuelto,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/fraudes`, {
      fraude,
    });
    const datos = {
      fraudes: result.data,
      estadosFraude,
      verTodo: true,
    };

    res.render("admin/fraudes", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

// helpers
const randomString = (long, chars) => {
  let result = "";
  for (let i = long; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
