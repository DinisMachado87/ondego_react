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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import LatestFriendsLogIn from "../friends/LatestFriendsLogIn";

function EventsPage({message, filter = ''}) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const filterString = typeof filter === 'object' ? JSON.stringify(filter) : filter;
      const { data } = await axiosReq.get(`/events/?${filterString}search=${query}`);
      setEvents(data);
      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  setHasLoaded(false);
  const timer = setTimeout(() => {
    fetchEvents();
  }, 500);
  return () => {
    clearTimeout(timer);
  };
}, [filter, query, pathname]);


  return (
    <Row className='h-100'>
      <Col
        className='py-2 p-0 p-lg-2'
        lg={8}>
        <p></p>
        <i className={ `fas fa-search ${styles.SearchIcon}` }></i>
        <Form className={ styles.SearchBar } onSubmit={ (e) => e.preventDefault() }>
          <Form.Control
            value={ query }
            onChange={ (e) => setQuery(e.target.value) }
            type='text'
            className='mr-sm-2'
            placeholder='type to search...'
          />
        </Form>

        { hasLoaded ? (
          <>
            {events.results.length ? (
              <InfiniteScroll
                children={ events.results.map((event) => (
                  <Event key={ event.id } { ...event } setEvents={ setEvents } />
                ))}
                dataLength={ events.results.length }
                loader={ <Asset spinner /> }
                hasMore={ !!events.next }
                next={() => fetchMoreData(events, setEvents)}
              />
              ) : ( <Container
              className="appStyles.Content"
              >
                <Asset
                  src={ NoResults }
                  message={ message }
                />
            </Container> 
            )}
          </>
        ): (
          <Container
            className={ appStyles.Content }
          >
            <Asset spinner />
          </Container>
        ) }
      </Col>
      <Col md={ 4 }>
        <Container>
          <h3>Last Logins:</h3>
          <LatestFriendsLogIn />
        </Container>
      </Col>
    </Row>
  );
}

export default EventsPage;
