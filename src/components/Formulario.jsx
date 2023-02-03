import { useState } from "react";

import { Button, Form, Row, Col, Alert } from "react-bootstrap";

import useCategorias from "../hooks/useCategorias";
import useBebidas from "../hooks/useBebidas";

const Formulario = () => {

  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  // State de alerta
  const [alerta, setAlerta] = useState('')

  const { categorias } = useCategorias();
  const {consultarBebidas} = useBebidas()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.values(busqueda).includes('')) {
        setAlerta('Todos los campos son obligatorios')

        return
    }
    setAlerta('')
    consultarBebidas(busqueda)
  }

  return (
    <Form onSubmit={handleSubmit}>

    {alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3 text-center">
            <Form.Label htmlFor="nombre" className="fw-bold fs-5">
              Nombre de la Bebida
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Ej: Tequila, Vodka, etc..."
              name="nombre"
              value={busqueda.nombre}
              id="nombre"
              className="py-4 text-center"
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3 text-center">
            <Form.Label htmlFor="categoria" className="fw-bold fs-5">
              Categoría de la Bebida
            </Form.Label>

            <Form.Select
              id="categoria"
              name="categoria"
              className="py-4 text-center"
              value={busqueda.categoria}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option>-- Selecciona una Categoría --</option>

              {categorias.map((categoria) => (
                <option
                  key={categoria.strCategory}
                  value={categoria.strCategory}
                >
                  {categoria.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Row className="m-auto justify-content-center p-2">
          <Col md={10}>
            <Button
              variant="danger"
              className="text-uppercase py-3 w-100 fs-4 fw-bold"
              type="submit"
            >
              Buscar Bebidas
            </Button>
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

export default Formulario;
