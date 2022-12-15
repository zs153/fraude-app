import axios from "axios";
import { tiposMovimiento, estadosCarga } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8100/api/cargas", {});
    const datos = {
      cargas: JSON.stringify(result.data),
    };

    res.render("admin/cargas", { user, datos });
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
    res.render("admin/cargas/add", { user });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

export const insert = async (req, res) => {
  const user = req.user;
  const carga = {
    DESCAR: req.body.descar.toUpperCase(),
    FICCAR: req.body.ficcar,
    REFCAR: req.body.refcar,
    STACAR: estadosCarga.procesado,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearCarga,
  };

  try {
    await axios.post("http://localhost:8100/api/cargas/insert", {
      carga,
      movimiento,
    });

    res.redirect(`/admin/cargas`);
  } catch (error) {
    let msg = "No se ha podido crear la carga.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
