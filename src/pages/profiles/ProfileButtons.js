import React from "react";
import { Row, Button } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

export default function ProfileButtons({
  is_owner,
  profile,
  handleUnfriend,
  handleConsentFriendRequest,
  handleNotRightNowFriendRequest,
  handleCancelFriendRequest,
  handleCreateFriendRequest,
}) {
  const currentUser = useCurrentUser();
  
  return (
    <>
      {currentUser && !is_owner ? (
        profile?.is_friend ? (
          <Row className='justify-content-center no-gutters'>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Orange}`}
              onClick={() => handleUnfriend(profile)}>
              Unfriend
            </Button>
          </Row>
        ) : profile?.has_friend_request ? (
          <>
            <Row>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Orange}`}
                onClick={() => handleConsentFriendRequest(profile)}>
                Consent
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Orange}`}
                onClick={() => handleNotRightNowFriendRequest(profile)}>
                Not right now
              </Button>
            </Row>
          </>
        ) : profile?.has_requested_friendship ? (
          <Row>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Orange}`}
              onClick={() => handleCancelFriendRequest(profile)}>
              Cancel request
            </Button>
          </Row>
        ) : (
          <Row>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Orange}`}
              onClick={() => handleCreateFriendRequest(profile)}>
              propose Friendship
            </Button>
          </Row>
        )
      ) : null}
    </>
  );
}
