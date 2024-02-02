import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, Col } from 'react-bootstrap';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Col xs={12} sm={6}>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="input"
          name={name}
          type="text"
          required={required}
          isInvalid={isError}
          {...control}
        />
      </Form.Group>
    </Col>
  );
}

export default FormInput;
