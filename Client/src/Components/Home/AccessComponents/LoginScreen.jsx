import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [redirectPath, setRedirectPath] = useState(""); // Estado para almacenar la ruta de redirección
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3001/LoginUser", {
        email: correo,
        password: password,
      });

      if (response.status === 200) {
        const userData = response.data; // Toda la información del usuario
        localStorage.setItem("user", JSON.stringify(userData));
        console.log(userData); // Guarda toda la información del usuario en el localStorage
        setRedirectPath(response.data.rol);

        setShowAuthModal(true); // Muestra el modal de bienvenida
      } else if (response.status === 500) {
        setShowErrorModal(true);
        setLoginError("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Credenciales incorrectas:", error);
      setShowErrorModal(true);
      setLoginError("Los datos son incorrectos");
    }
  };

  // Función para manejar el cierre del modal y redirigir
  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    // Redirige al usuario según el rol almacenado
    switch (redirectPath) {  
      case 1:
        navigate("/homePaciente");
        break;
      case 2:
        navigate("/homeDoctor");
        break;
      case 3:
        navigate("/homeAdmin");
        break;
      default:
        console.log("Rol no especificado dentro del sistema");
        break;
    }
  };

  return (
    <>
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
        <Row className="w-75">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src="https://via.placeholder.com/400"
              alt="Placeholder"
              style={{ width: "80%", height: "100%", border: "1px solid black" }}
            />
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h1>Hola!</h1>
            <h3>Buenos días</h3>
            <p>Inicia sesión con tu cuenta.</p>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo / Usuario</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo o usuario"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un correo válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="link"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  La contraseña es requerida.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="d-flex justify-content-between mb-3">
                <Form.Text className="text-muted">
                  <a href="/forgotPassword">¿Olvidaste tu contraseña?</a>
                </Form.Text>
              </Form.Group>

              <div className="d-flex justify-content-between mb-3">
                <Button variant="primary" type="submit">
                  Iniciar Sesión
                </Button>
                <Button variant="secondary" type="button" href="/register">
                  Regístrate
                </Button>
              </div>

              <div className="text-center">
                <p>Ó</p>
                <Button
                  variant="outline-dark"
                  className="d-flex align-items-center justify-content-center w-100 mb-2"
                >
                  <span className="me-2">G</span>Continuar con Google
                </Button>
                <Button
                  variant="outline-dark"
                  className="d-flex align-items-center justify-content-center w-100"
                >
                  <span className="me-2">f</span>Continuar con Facebook
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Modal de error */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Datos incorrectos</Modal.Title>
        </Modal.Header>
        <Modal.Body>{loginError}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de autenticación exitosa */}
      <Modal show={showAuthModal} onHide={handleAuthModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de sesión exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bienvenido!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAuthModalClose}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
