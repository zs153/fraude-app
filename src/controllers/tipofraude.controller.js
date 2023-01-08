import axios from "axios";
import { tiposMovimiento } from "../public/js/enumeraciones";
import { serverAPI } from '../config/settings'

export const mainPage = async (req, res) => {
  const user = req.user;
  const tipo = {}

  try {
    const result = await axios.post(`http://${serverAPI}:8100/api/tipos/fraudes`, {
      tipo,
    });
    const datos = {
      tipos: result.data,
    };

    res.render("admin/tipos/fraudes", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  try {
    res.render("admin/tipos/fraudes/add", { user });
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
    const result = await axios.post(`http://${serverAPI}:8100/api/tipos/fraude`, {
      tipo,
    });
    const datos = {
      tipo: result.data,
    };

    res.render("admin/tipos/fraudes/edit", { user, datos });
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
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTipoFraude,
  };

  try {
    await axios.post(`http://${serverAPI}:8100/api/tipos/fraudes/insert`, {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/`);
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
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTipoFraude,
  };

  try {
    axios.post(`http://${serverAPI}:8100/api/tipos/fraudes/update`, {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/fraudes`);
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
    TIPMOV: tiposMovimiento.borrarTipoFraude,
  };

  try {
    await axios.post(`http://${serverAPI}:8100/api/tipos/fraudes/delete`, {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/fraudes`);
  } catch (error) {
    const msg = "No se ha podido elminar el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
