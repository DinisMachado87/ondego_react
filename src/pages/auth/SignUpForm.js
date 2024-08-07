import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  const [error, setError] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <>
      <Row className={styles.Row}>
        <Col
          className='py-auto p-md-2'
          md={6}>
          <Container className={`${appStyles.Content} p-4 `}>
            <p className='text-warning text-center pt-3'>
              öndëgö (pronounced "on the go" but cosy) is your helper for
              spontaneous meets with your friends.
            </p>
            <h1 className={styles.Header}>Sign up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='username'>
                <Form.Label className='d-none'>Username </Form.Label>
                <Form.Control
                  className={styles.Input}
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {error.username?.map((message, index) => (
                <Alert
                  variant='warning'
                  key={index}>
                  {message}
                </Alert>
              ))}
              <Form.Group controlId='password1'>
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type='password'
                  placeholder='Password'
                  name='password1'
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {error.password1?.map((message, index) => (
                <Alert
                  variant='warning'
                  key={index}>
                  {message}
                </Alert>
              ))}
              <Form.Group controlId='password2'>
                <Form.Label className='d-none'>Confirm Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {error.password2?.map((message, index) => (
                <Alert
                  variant='warning'
                  key={index}>
                  {message}
                </Alert>
              ))}
              <Button
                className={`${btnStyles.Button} ${btnStyles.Green} ${btnStyles.FullWidth}`}
                type='submit'>
                Sign up
              </Button>
              {error.non_field_errors?.map((message, index) => (
                <Alert
                  variant='warning'
                  className='mt-3'
                  key={index}>
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
          <Container className={`mt-3 ${appStyles.Content}`}>
            <Link
              className={styles.Link}
              to='/signin'>
              Already have an account? <span>Sign in</span>
            </Link>
          </Container>
        </Col>
        <Col
          md={6}
          className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}>
          <Container className={`${appStyles.Content}`}>
            <Image
              src='https://res.cloudinary.com/drgepxrpe/image/upload/v1712698055/ondego_event_placeholder/ppumyfwefatzziuko1ru'
              width='100%'
              rounded
            />
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default SignUpForm;
