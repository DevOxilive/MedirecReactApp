export const loginUser = (app, db) => {
  app.post("/LoginUser", (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM usuarios WHERE usa_email = ? AND usa_contraseña = ?`;

    // Primero intenta buscar en la tabla de usuarios
    db.query(query, [email, password], (err, result) => {
      if (err) {
        console.error("Error al verificar credenciales en la tabla de usuarios:", err);
        return res.status(500).send("Error al verificar credenciales");
      }
      else {
        return res.status(200).json(result[0]);
      }
    });
  })
};
