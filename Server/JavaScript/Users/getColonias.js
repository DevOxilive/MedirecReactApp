export const getColonias = (app, db) =>{
    app.get('/colonias/:codigoPostal', (req, res) => {
        const { codigoPostal } = req.params;
        const query = 'SELECT * FROM colonias WHERE codigo_postal = ?';
        db.query(query, [codigoPostal], (err, results) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json(results);
          }
        });
      });
} 