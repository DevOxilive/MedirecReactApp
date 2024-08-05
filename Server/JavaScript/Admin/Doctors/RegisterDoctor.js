export const RegisterDoctor = (app, dbMedirec) => {
  app.post("/RegisterDoctor", (req, res) => {
 
    const {
      formFirstName = req.body.Nombre,
      formLastName = req.body.Apellido,
      formEspecialidad = req.body.Especialidad,
      formFechaNacimiento = req.body.FechaNacimiento,
      formTelefono = req.body.Telefono,
      formCalle = req.body.Calle,
      formNumExt = req.body.NumExt,
      formNumInt = req.body.NumInt,
      formColonia = req.body.Colonia,
      formLicencia = req.body.Licencia,
      formExperiencia = req.body.Experiencia,
      formHospitalProcedencia = req.body.HospitalProcedencia,
      formTarifa = req.body.Tarifa,
      formEducacion = req.body.Educación,
      formUser = req.body.User
    } = req.body;

    console.log(req.body.Estado);

    // Debemos asegurarnos que los nombnres de la columna sean correctos en la base de datos
    const INSERT_DOCTOR_QUERY = `INSERT INTO doctores (doc_nombre , doc_apellidos , doc_especialidad , doc_fecha_nacimiento , doc_telefono , doc_calle , doc_num_ext , doc_num_int , doc_id_colonia, doc_numero_licencia , doc_anios_experiencia , doc_afiliacion_hospitalaria , doc_tarifa_consulta , doc_educacion , doc_id_user ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    dbMedirec.query(
      INSERT_DOCTOR_QUERY,
      [
        formFirstName,
        formLastName,
        formEspecialidad,
        formFechaNacimiento,
        formTelefono,
        formCalle,
        formNumExt,
        formNumInt,
        formColonia,
        formLicencia,
        formExperiencia,
        formHospitalProcedencia,
        formTarifa,
        formEducacion,
        formUser
      ],
      (err, result) => {
        if (err) {
          console.error("Error al registrar el doctor:", err);
          res.status(400).send("Error al registrar doctor");
        } else {
          console.log("Doctor registrado correctamente");
          res.status(200).send("Doctor registrado correctamente");
        }
      }
    );
  });
};
