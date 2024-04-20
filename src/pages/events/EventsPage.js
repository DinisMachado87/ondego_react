import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Event from "./Event";

import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";

function EventsPage(message, filter = "") {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/?${filter}`);
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchEvents();
  }, [filter, pathname]);

  return (
    <Row className='h-100'>
      <Col
        className='py-2 p-0 p-lg-2'
        lg={8}>
        <p></p>
        { hasLoaded ? (
          <>
            { events.results.length ?
              events.results.map((event) => (
                <Event
                  key={event.id}
                  {...event}
                  setEvents={setEvents}
                />
              )) 
              : <Container
              className="appStyles.Content"
              >
                <Asset
                  src={ NoResults }
                  message={ message }
                />
              </Container> }
          </>
        ): (
          <Container
            className={ appStyles.Content }
          >
            <Asset spinner />
          </Container>
        ) }
      </Col>
      <Col
        md={4}
        className='d-none d-lg-block p-0 p-lg-2'>
        <p></p>
      </Col>
    </Row>
  );
}

export default EventsPage;
