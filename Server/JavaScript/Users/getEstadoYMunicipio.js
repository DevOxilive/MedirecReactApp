export const getEstadoYMunicipio = (app, db) => {
  app.get("/estado/municipio/:idColonia", (req, res) => {
    const { idColonia } = req.params;
    const query = 
    "SELECT e.nombre AS 'estado', m.nombre AS 'municipio' FROM estados e, municipios m, colonias c WHERE e.id = m.estado AND m.id = c.municipio AND c.id = ?";
    db.query(query, [idColonia], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
};
