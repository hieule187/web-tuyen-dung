import React from 'react';
import './styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';

const SignupRecruiter = () => {
  return (
    <>
      <Form className="my-4">

        <InputGroup className="mb-3">

          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">

          <Form.Control
            type='password'
            placeholder="Password"
            name="password"
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">

          <Form.Control
            type='password'
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
        </InputGroup>

        <Button style={{ width: '100%' }} variant="success" type="submit">
          Register
        </Button>
      </Form>

      <p>
        Already have an account?
        <Link to="/">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default SignupRecruiter;
