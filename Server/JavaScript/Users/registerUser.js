export const registerUser = (app, db) => {
    // Ruta para registrar usuarios
    app.post("/RegisterUser", (req, res) => {
      const {
        formEmail = req.body.Correo,
        formPassword = req.body.Contraseña,
        formFotoPerfil = req.body.FotoPerfil,
        formRol = req.body.Rol,
      } = req.body;
  
      // Asegúrate de usar los nombres de columna correctos en tu tabla de base de datos
      const INSERT_USER_QUERY = 'INSERT INTO `medirecactreact`.`usuarios` (`usa_email`, `usa_contraseña`, `usa_foto_perfil`, `rol`) VALUES ( ?, ?, ?, ? );';
      
      db.query(
        INSERT_USER_QUERY,
        [
          formEmail,
          formPassword,
          formFotoPerfil,
          formRol
        ],
        (err, result) => {
          if (err) {
            console.error("Error al registrar usuario:", err);
            res.status(400).send("Error al registrar usuario");
          } else {
            res.status(200).send(result);
          }
        }
      );
    });
  };