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
import LatestFriendsLogIn from "../profiles/LatestFriendsLogIn";
import { useRedirect } from "../../hooks/useRedirect";

function EventsPage({ message, filter = "" }) {
  useRedirect("loggedOut");

  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/?${filter}&search=${query}`
        );
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
    <div>
      <Row className='pt-5'>
        <h3 className={`${styles.GreenYellow} pt-5`}>
          öndëgö about and instructions:
        </h3>
        <p>
          öndëgö (pronounced "on the go" but cosy) is your helper for
          spontaneous meets with your friends.
        </p>
        <p>
          You can see all users and request them as friends, but you can only
          see events created by your friends so things keep cosy and private.
        </p>
        <p>
          Create a simple event clicking the button "Create Event" in the top
          right corner and get your friends to join.
        </p>
        <p>
          Or check out the events your friends have going on or starting in the
          coming 2 hours by clicking the button "Going ön".
        </p>
        <p>
          Let your friends know if you are joining, considering or can't make it
          by clicking the icons in the bottom of each event.
        </p>
        <p>
          Check out the profile of your friends by clicking their Avatar or
          photo.
        </p>
        <p>
          Edit your profile by clicking the button "Profile" in the top right
          corner.
        </p>
        <p>
          Comment on the events to let your friends know what you think or ask
          questions.
        </p>
        <p>
          Communicate intention with the fields "feeling" and "would like to" in
          your profile and "intention" in the event.
        </p>
        <p>Have fun!</p>
      </Row>
      <LatestFriendsLogIn mobile />
      <Row className='h-100'>
        <Col
          className='py-2 p-0 p-lg-2'
          style={{ position: "relative" }}
          lg={8}>
          <div>
            <div className={`${styles.FixedSearchContainer} mt-lg-0 mt-md-5`}>
              {" "}
              <i className={`fas fa-search ${styles.SearchIcon}`}></i>
              <Form
                className={styles.SearchBar}
                onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type='text'
                  className='mr-sm-2'
                  placeholder='Search user or event ...'
                />
              </Form>
            </div>
          </div>
          {hasLoaded ? (
            <div>
              {events.results.length ? (
                <InfiniteScroll
                  children={events.results.map((event) => (
                    <Event
                      key={event.id}
                      {...event}
                      setEvents={setEvents}
                    />
                  ))}
                  dataLength={events.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!events.next}
                  next={() => fetchMoreData(events, setEvents)}
                />
              ) : (
                <Container className='appStyles.Content'>
                  <Asset
                    src={NoResults}
                    message={message}
                  />
                </Container>
              )}
            </div>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
        <Col
          className={styles.ProfileList}
          lg={4}>
          <Container>
            <LatestFriendsLogIn />
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default EventsPage;
