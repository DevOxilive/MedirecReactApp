export const registerPaciente = (app, db) => {
  // Ruta para registrar usuarios
  app.post("/RegisterPaciente", (req, res) => {
    const {
      formFirstName = req.body.Nombre,
      formLastName = req.body.Apellido,
      formFechaNac = req.body.FechaNacimiento,
      formTelefono = req.body.Telefono,
      formCalle = req.body.Calle,
      formNumExt = req.body.NumExt,
      formNumInt = req.body.NumInt,
      formColonia = req.body.Colonia,
      formAlergias = req.body.Alergias,
      formUser = req.body.User
    } = req.body;

    // Asegúrate de usar los nombres de columna correctos en tu tabla de base de datos
    const INSERT_USER_QUERY = 'INSERT INTO `pacientes` (`pac_nombre`, `pac_apellidos`, `pac_fecha_nacimiento`, `pac_telefono`, `pac_calle`, `pac_num_ext`, `pac_num_int`, `pac_id_colonia`, `pac_alergias`, `pac_id_user`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(
      INSERT_USER_QUERY,
      [
        formFirstName,
        formLastName, 
        formFechaNac,
        formTelefono,
        formCalle,
        formNumExt,
        formNumInt,
        formColonia,
        formAlergias,
        formUser
      ],
      (err, result) => {
        if (err) {
          console.error("Error al registrar usuario:", err);
          res.status(400).send("Error al registrar usuario");
        } else {
          console.log("Usuario registrado correctamente");
          res.status(200).send("Usuario registrado correctamente");
        }
      }
    );
  });
};
