import axios from "axios";
import { tiposMovimiento } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8100/api/tipos/eventos", {});
    const datos = {
      tipos: JSON.stringify(result.data),
    };

    res.render("admin/tipos/eventos", { user, datos });
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
    res.render("admin/tipos/eventos/add", { user });
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
    const result = await axios.post("http://localhost:8100/api/tipos/evento", {
      tipo,
    });
    const datos = {
      tipo: result.data,
    };

    res.render("admin/tipos/eventos/edit", { user, datos });
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
    TIPMOV: tiposMovimiento.crearTipoEvento,
  };

  try {
    await axios.post("http://localhost:8100/api/tipos/eventos/insert", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/eventos`);
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
    TIPMOV: tiposMovimiento.modificarTipoEvento,
  };

  try {
    axios.post("http://localhost:8100/api/tipos/eventos/update", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/eventos`);
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
    TIPMOV: tiposMovimiento.borrarTipoEvento,
  };

  try {
    await axios.post("http://localhost:8100/api/tipos/eventos/delete", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/eventos`);
  } catch (error) {
    const msg = "No se ha podido elminar el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
