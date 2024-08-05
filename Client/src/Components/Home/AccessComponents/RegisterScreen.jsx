import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavBar } from "../NavBar";
import axios from "axios";

export const RegisterScreen = () => {
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [validated, setValidated] = useState(false);

  const [state, setState] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [colonies, setColonies] = useState([]);
  const [selectedColonia, setSelectedColonia] = useState("");

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  //Inicio funciones Sepomex
  const fetchColonies = (event) => {
    const postalCode = event.target.value;
    setSelectedColonia("");
    setColonies([]);
    setMunicipality("");
    setState("");
    if (postalCode.length == 5) {
      axios.get(`http://localhost:3001/colonias/${postalCode}`)
        .then((response) => {
          setColonies(response.data);
        })
        .catch((error) => console.log("Error al cargar las colonias: ", error));
    }
  }
  const handleColonyChange = (event) => {
    const colonyId = event.target.value;
    setMunicipality("");
    setState("");
    if (colonyId != "") {
      setSelectedColonia(colonyId);
      axios.get(`http://localhost:3001/estado/municipio/${colonyId}`)
        .then((response) => {
          setMunicipality(response.data[0].municipio);
          setState(response.data[0].estado);
        })
        .catch((err) => console.log("Error al cargar el municipio y el estado: ", err));
    }
  }
  //Fin funciones Sepomex

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el envío automático del formulario
    const form = formRef.current;
    event.stopPropagation();
    setValidated(true); // Actualiza el estado para mostrar los errores de validación

    // Validación del formulario usando HTML5
    if (form.checkValidity() === false) {
      return;
    }

    // Recolecta los datos del formulario
    const formData = new FormData(form);
    const pacData = {
      Nombre: formData.get("formFirstName"),
      Apellido: formData.get("formLastName"),
      FechaNacimiento: formData.get("formFechaNacimiento"),
      Telefono: formData.get("formTelefono"),
      Calle: formData.get("formCalle"),
      NumExt: formData.get("formNumeroExterior"),
      NumInt: formData.get("formNumeroInterior"),
      Colonia: selectedColonia,
      Alergias: formData.get("formAlergias"),
      User: ""
    };
    const userData = {
      Correo: formData.get("formEmail"),
      Contraseña: formData.get("formPassword"),
      FotoPerfil: "",
      Rol: 3
    }
    axios.post("http://localhost:3001/RegisterUser", userData)
      .then((response) => {
        if (response.status === 200) {
          pacData.User = response.data.insertId;
          axios
            .post("http://localhost:3001/RegisterPaciente", pacData)
            .then(() => {
              alert("Usuario registrado con éxito");
              form.reset(); // Opcional: limpia el formulario después del registro
            })
            .catch((error) => {
              console.error("Hubo un error al registrar el usuario", error);
            });
        }
      })
      .catch((error) => console.log("Error al registrar usuario: ", error));


  };

  return (
    <>
      <NavBar />

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row className="justify-content-md-center mt-5">
          <h2 className="text-center mb-4">
            Estás a un paso de transformar tu salud
          </h2>

          <Col md="8">
            <h3 className="mb-4">Crea una cuenta</h3>
            <Form
              ref={formRef}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="needs-validation"
            >
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="formFirstName"
                  required
                  minLength="2"
                  maxLength="50"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu nombre (mín. 2 caracteres).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  name="formLastName"
                  required
                  minLength="2"
                  maxLength="50"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu apellido (mín. 2 caracteres).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formFechaNacimiento" className="mb-3">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="formFechaNacimiento"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu fecha de nacimiento
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formTelefono" className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Teléfono"
                  name="formTelefono"
                  required
                  pattern="[0-9]{10}"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un número de teléfono válido (10 dígitos).
                </Form.Control.Feedback>
              </Form.Group>

              {/* Comienza bloque dirección */}
              <Form.Group controlId="formCalle" className="mb-3">
                <Form.Label>Calle</Form.Label>
                <Form.Control
                  name="formCalle"
                  type="text"
                  placeholder="Ingresa el nombre de la calle"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNumeroExterior" className="mb-3">
                <Form.Label>Número Exterior</Form.Label>
                <Form.Control
                  name="formNumeroExterior"
                  type="text"
                  placeholder="Ingresa el número exterior"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNumeroInterior" className="mb-3">
                <Form.Label>Número Interior</Form.Label>
                <Form.Control
                  name="formNumeroInterior"
                  type="text"
                  placeholder="Ingresa el número interior"
                />
              </Form.Group>

              <Form.Group controlId="formCodigoPostal" className="mb-3">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  name="formCodigoPostal"
                  type="text"
                  placeholder="Ingresa el nombre de la calle"
                  maxLength="5"
                  onInput={fetchColonies}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formColonia" className="mb-3">
                <Form.Label>Colonia</Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={selectedColonia}
                  onChange={handleColonyChange}
                  name="formColonia"
                >
                  <option value="">Selecciona tu colonia</option>
                  {Array.isArray(colonies) &&
                    colonies.map((colonia) => (
                      <option key={colonia.id} value={colonia.id}>
                        {colonia.nombre}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecciona tu colonia.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formMunicipio" className="mb-3">
                <Form.Label>Municipio</Form.Label>
                <Form.Control
                  type="text"
                  value={municipality != "" ? municipality : 'Selecciona una colonia'}
                  name="formMunicipio"
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  Selecciona tu municipio.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEstado" className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  value={state != "" ? state : 'Selecciona una colonia'}
                  name="formEstado"
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  Selecciona tu estado.
                </Form.Control.Feedback>
              </Form.Group>
              {/* Termina Bloque Dirección */}

              <Form.Group controlId="formAlergias" className="mb-3">
                <Form.Label>Alergias</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alergias"
                  required
                  name="formAlergias"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tus alergias.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  required
                  name="formEmail"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un correo electrónico válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    name="formPassword"
                    required
                    minLength="6"
                    isInvalid={!!passwordError}
                  />
                  <Button
                    variant="link"
                    className="btn-icon"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  {passwordError ||
                    "La contraseña debe tener al menos 6 caracteres."}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar Contraseña"
                    name="formConfirmPassword"
                    required
                    minLength="6"
                    isInvalid={!!confirmPasswordError}
                  />
                  <Button
                    variant="link"
                    className="btn-icon"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  {confirmPasswordError || "Las contraseñas no coinciden."}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formTerms" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Crear una cuenta y aceptar términos y condiciones"
                  required
                  name="formTerms"
                />
                <Form.Control.Feedback type="invalid">
                  Debes aceptar los términos y condiciones.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Crear una cuenta
              </Button>

              <Button
                variant="outline-dark"
                className="w-100 mb-3 d-flex align-items-center justify-content-center"
              >
                <FaGoogle className="me-2" />
                <span>Crea una cuenta con Google</span>
              </Button>

              <Button
                variant="primary"
                className="w-100 d-flex align-items-center justify-content-center"
              >
                <FaFacebook className="me-2" />
                <span>Crea una cuenta con Facebook</span>
              </Button>
            </Form>

            <p className="mt-3 text-center">
              ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
