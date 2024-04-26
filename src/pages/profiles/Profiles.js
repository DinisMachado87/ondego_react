import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button, Col, Row } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

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
    name,
  } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const {
    handleCancelFriendRequest,
    handleConsentFriendRequest,
    handleCreateFriendRequest,
    handleNotRightNowFriendRequest,
    handleUnfriend,
  } = useSetProfileData();

  return (
    <div className='p-3'>
      <Link
        className='align-self-center'
        to={`/profiles/${id}`}>
        <Col className={`my-3 ${mobile && "m-3"} ${styles.ProfileBar} px-3`}>
          <Row>
            {mobile && (
              <>
                <Col>
                  <Row className='p-3 text-center'>
                    <Avatar
                      src={image}
                      height={imageSize}
                      text={
                        <>
                    {name ? (
                      <Row>
                        <h4>{name}</h4>
                        <span>
                          <p>{owner}</p>
                        </span>
                      </Row>
                    ) : (
                      <h4>{owner}</h4>
                    )}
                        </>
                      }
                      />
                  </Row>
                  <Row>
                      <p>Organïzed {events_count} events</p>
                      <p>Joïned {joined_events_count} events</p>
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
                  </Row>
                </Col>
              </>
            )}

            {!mobile && (
              <Row className="m-2">
                <Col className={`${styles.WordBreak} ${!mobile && "col-6"}`}>
                  <Avatar
                    src={image}
                    height={imageSize}
                    text={
                      <>
                        {name ? (
                          <>
                            <h4 className="p-3">{name}</h4>
                            <p>{owner}</p>
                          </>
                        ) : (
                          <h4>{owner}</h4>
                        )}
                        <p>Organïzed {events_count} events</p>
                        <p>Joïned {joined_events_count} events</p>
                      </>
                    }
                  />
                </Col>
                <Col>
                  {feeling && <p>feeling {feeling}</p>}
                  {would_like_to && <p>would like to {would_like_to}</p>}
                </Col>
                <Col className='col-6'>
                  <Link to={`/profiles/${id}`}></Link>
                </Col>
              </Row>
            )}
          </Row>
          <Row className={`text-center ${!mobile && "ml-auto"} `}>
            {
              currentUser && !is_owner ? (
                // Checks if the user is logged in and not the owner of the profile
                profile?.friends_id ? (
                  // Checks if the user is a friend of the profile owner
                  <div>
                    <Button
                      className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                      onClick={() => handleUnfriend(profile)}>
                      Unfriend
                    </Button>
                  </div>
                ) : profile?.has_friend_request ? (
                  // Checks if the user has a friend request from the profile owner
                  <>
                    <div>
                      <Button
                        className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                        onClick={() => handleConsentFriendRequest(profile)}>
                        Consent
                      </Button>
                    </div>
                    <div>
                      <Button
                        className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                        onClick={() => handleNotRightNowFriendRequest(profile)}>
                        Not right now
                      </Button>
                    </div>
                  </>
                ) : profile?.has_requested_friendship ? (
                  // Checks if the user has requested friendship from the profile owner
                  <div>
                    <Button
                      className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                      onClick={() => handleCancelFriendRequest(profile)}>
                      Cancel request
                    </Button>
                  </div>
                ) : (
                  // If none of the above, the user can request friendship
                  <div>
                    <Button
                      className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                      onClick={() => handleCreateFriendRequest(profile)}>
                      propose Friendship
                    </Button>
                  </div>
                )
              ) : currentUser ? (
                // If the user is logged in and the owner of the profile
                <div>
                  <Button
                    className={`${btnStyles.ProfilesButton} ${btnStyles.Orange}`}
                    onClick={() => {}}>
                    Edit profile
                  </Button>
                </div>
              ) : null
              // If the user is not logged in, no buttons are displayed
            }
          </Row>
        </Col>
      </Link>
    </div>
  );
};

export default Profile;
