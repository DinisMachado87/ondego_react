import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { setFeeling, setName, setWouldLikeTo } from "../../contexts/ProfileDataContext";


function ProfileEditForm({ id }) {
  const [profileData, setProfileData] = useState({
    name: "",
    feeling: "",
    wouldLikeTo: "",
    image: null,
  });

 
  
  const { name, feeling, wouldLikeTo, image } = profileData;
  const imageFile = useRef();
  const history = useHistory();

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("feeling", feeling);
    formData.append("wouldLikeTo", wouldLikeTo);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      await axiosReq.put(`/profiles/${id}/`, formData);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className='my-2 col-2 mx-auto'>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              ref={imageFile}
              onChange={ (e) => {
                if (e.target.files.length) {
                  setProfileData({
                    ...profileData,
                    image: URL.createObjectURL(e.target.files[0]),
                  });
                }
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='justify-content-center no-gutters'>
        <Col className='my-2 col-12'>
          <Row className='my-2'>
            <Col xs={12}>
              <Row>
                <Col xs={3}>
                  <Form.Label>Name</Form.Label>
                </Col>
                <Col xs={9}>
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className='my-2'>
            <Col xs={12}>
              <Row>
                <Col xs={3}>
                  <Form.Label>Feeling</Form.Label>
                </Col>
                <Col xs={9}>
                  <Form.Control
                    type='text'
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className='my-2'>
            <Col xs={12}>
              <Row>
                <Col xs={3}>
                  <Form.Label>Would Like To</Form.Label>
                </Col>
                <Col xs={9}>
                  <Form.Control
                    type='text'
                    value={wouldLikeTo}
                    onChange={(e) => setWouldLikeTo(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col className='my-2 col-3'>
          <div className='mt-3 pt-2'>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Orange}`}
              type='submit'>
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default ProfileEditForm;
