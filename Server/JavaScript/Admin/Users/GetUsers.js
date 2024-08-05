export const GetUsers = (app, dbMedirec, dbSepomex) => {
  app.get("/getUsuarios", (req, res) => {
    // Consulta todos los usuarios sin paginación
    dbMedirec.query("SELECT * FROM usuarios", (err, usuarios) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Extrae los ids de estado, municipio y colonia de los usuarios
      const estadosIds = [...new Set(usuarios.map(user => user.usa_estado))];
      const municipiosIds = [...new Set(usuarios.map(user => user.usa_municipio))];
      const coloniasIds = [...new Set(usuarios.map(user => user.usa_colonia))];

      // Consulta los nombres de los estados
      dbSepomex.query("SELECT * FROM estados WHERE id IN (?)", [estadosIds], (err, estados) => {
        if (err) {
          return res.status(500).send(err);
        }

        // Consulta los nombres de los municipios
        dbSepomex.query("SELECT * FROM municipios WHERE id IN (?)", [municipiosIds], (err, municipios) => {
          if (err) {
            return res.status(500).send(err);
          }

          // Consulta los nombres de las colonias
          dbSepomex.query("SELECT * FROM colonias WHERE id IN (?)", [coloniasIds], (err, colonias) => {
            if (err) {
              return res.status(500).send(err);
            }

            // Crea un mapa de nombres de estados, municipios y colonias
            const estadosMap = new Map(estados.map(e => [e.id, e.nombre]));
            const municipiosMap = new Map(municipios.map(m => [m.id, m.nombre]));
            const coloniasMap = new Map(colonias.map(c => [c.id, c.nombre]));

            // Combina la información de los usuarios con los nombres
            const usuariosConNombres = usuarios.map(user => ({
              ...user,
              usa_estado_nombre: estadosMap.get(user.usa_estado) || 'Desconocido',
              usa_municipio_nombre: municipiosMap.get(user.usa_municipio) || 'Desconocido',
              usa_colonia_nombre: coloniasMap.get(user.usa_colonia) || 'Desconocido'
            }));

            // Envía la respuesta
            res.json({
              users: usuariosConNombres
            });
          });
        });
      });
    });
  });
};
