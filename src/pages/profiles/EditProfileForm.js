import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import btnStyles from "../../styles/Button.module.css";
import { Row, Col } from "react-bootstrap";

function EditProfileForm({ id }) {
  const [name, setName] = useState("");
  const [feeling, setFeeling] = useState("");
  const [wouldLikeTo, setWouldLikeTo] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className='justify-content-center no-gutters'>
        <Col className='my-2 col-2'>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col className='my-2 col-2'>
          <Form.Group>
            <Form.Label>Feeling</Form.Label>
            <Form.Control
              type='text'
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col className='my-2 col-2'>
          <Form.Group>
            <Form.Label>Would Like To</Form.Label>
            <Form.Control
              type='text'
              value={wouldLikeTo}
              onChange={(e) => setWouldLikeTo(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col className='my-2 col-2'>
          <div
          className='mt-3 pt-2'
          >
          <Button
            className={`${btnStyles.Button} ${btnStyles.Orange}`}
            onClick={() => {
              console.log("clicked");
            }}>
            Submit
          </Button>
              </div>
        </Col>
      </Row>
      <Row>
        <Col className='my-2 col-2'>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default EditProfileForm;
