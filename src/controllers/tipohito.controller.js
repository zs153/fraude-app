import axios from "axios";
import { tiposMovimiento, arrEstadosHito } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;
  const tipo = {}

  try {
    const result = await axios.post("http://localhost:8100/api/tipos/hitos", {
      tipo,
    });
    const datos = {
      tipos: result.data,
    };

    res.render("admin/tipos/hitos", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const datos = {
    arrEstadosHito,
  }
  try {
    res.render("admin/tipos/hitos/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editPage = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: req.params.id,
  };

  try {
    const result = await axios.post("http://localhost:8100/api/tipos/hito", {
      tipo,
    });
    const datos = {
      tipo: result.data,
      arrEstadosHito,
    };

    res.render("admin/tipos/hitos/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

export const insert = async (req, res) => {
  const user = req.user;
  const tipo = {
    DESTIP: req.body.destip.toUpperCase(),
    ANUHIT: req.body.anuhit,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTipoHito,
  };

  try {
    await axios.post("http://localhost:8100/api/tipos/hitos/insert", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/hitos`);
  } catch (error) {
    let msg = "No se ha podido crear el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const update = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: req.body.idtipo,
    DESTIP: req.body.destip.toUpperCase(),
    ANUHIT: req.body.anuhit,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTipoHito,
  };

  try {
    axios.post("http://localhost:8100/api/tipos/hitos/update", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/hitos`);
  } catch (error) {
    let msg =
      "No se ha podido actualizar el tipo. Verifique los datos introducidos";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const remove = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: req.body.idtipo,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTipoHito,
  };

  try {
    await axios.post("http://localhost:8100/api/tipos/hitos/delete", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/hitos`);
  } catch (error) {
    const msg = "No se ha podido elminar el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
