import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button, Col, Row } from "react-bootstrap";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const {
    id,
    owner,
    feeling,
    would_like_to,
    image,
    events_count,
    joined_events_count,
    friends_id,
    has_friend_request,
    has_requested_friendship,
  } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div className='py-1'>
      <Col className={`my-3 ${mobile && "m-3"} ${styles.ProfileBar} px-3`}>
        <Row>
          {mobile && (
            <>
              <Col>
                <Row className='p-3 text-center'>
                  <Link
                    className='align-self-center'
                    to={`/profiles/${id}`}>
                    <Avatar
                      src={image}
                      height={imageSize}
                    />
                  </Link>
                </Row>
                <Row>
                  <h4>{owner}</h4>
                  {feeling && (
                    <>
                      <p>feeling</p>
                      <p>{feeling}</p>
                    </>
                  )}
                  {would_like_to && (
                    <>
                      <p>would like to</p>
                      <p>{would_like_to}</p>
                    </>
                  )}
                  <p>events: </p>
                  <p>{events_count}</p>
                  <p>joined: </p>
                  <p>{joined_events_count}</p>
                </Row>
              </Col>
            </>
          )}
          {!mobile && (
            <>
              <Col className={`${styles.WordBreak} ${!mobile && "col-9"}`}>
                <h4>{owner}</h4>
                {feeling && <p>feeling {feeling}</p>}
                {would_like_to && <p>would like to {would_like_to}</p>}
                <p>events: {events_count}</p>
                <p>joined: {joined_events_count}</p>
              </Col>
              <Col className='col-3 p-3'>
                <Link to={`/profiles/${id}`}>
                  <Avatar
                    src={image}
                    height={imageSize}
                  />
                </Link>
              </Col>
            </>
          )}
        </Row>
        <Row className={`text-center ${!mobile && "ml-auto"} `}>
          {!mobile &&
            currentUser &&
            !is_owner &&
            (friends_id ? (
              <div>
                <Button
                  className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                  onClick={() => {}}>
                  unfriend
                </Button>
              </div>
            ) : has_friend_request ? (
              <div>
                <Button
                  className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                  onClick={() => {}}>
                  accept friend request
                </Button>
              </div>
            ) : has_requested_friendship ? (
              <div>
                <Button
                  className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                  onClick={() => {}}>
                  cancel friend request
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                  onClick={() => {}}>
                  request friendship
                </Button>
              </div>
            ))}
        </Row>
      </Col>
    </div>
  );
};

export default Profile;
