import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Profile from "./Profiles";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/LatestFriendsLogIn.module.css";

const LatestFriendsLogIn = ({ mobile }) => {
  const currentUser = useCurrentUser();
  const { latestFriendsLogIn } = useProfileData();
  const [hasLoaded, setHasLoaded] = useState(false);
  const profiles = latestFriendsLogIn.results
    ? currentUser
      ? latestFriendsLogIn.results.filter(
          (profile) => profile.id !== currentUser.pk
        )
      : latestFriendsLogIn.results
    : [];

  useEffect(() => {
    if (profiles.length > 0 || !latestFriendsLogIn.results) {
      setHasLoaded(true); // Set hasLoaded to true when profiles are ready or if there are no results
    }
  }, [profiles, latestFriendsLogIn.results]);
  
  const currentUserProfile =
    currentUser && latestFriendsLogIn.results
      ? latestFriendsLogIn.results.filter(
          (profile) => profile.id === currentUser.pk
        )
      : [];

  const currentUserProfileDeskTop = profiles.length
    ? currentUserProfile.map((currentUser) => (
        <React.Fragment key={currentUser.id}>
          <h3 className={styles.GreenYellow}>Your Profile</h3>
          <Profile
            key={currentUser.id}
            profile={currentUser}
          />
        </React.Fragment>
      ))
    : null;

  const otherProfilesSidebarMobile = (
    <>
      <Row className='pt-5'>
        <h3 className={ `${styles.GreenYellow} pt-5` }>Last Logins:</h3>
        <h4 className={ `${styles.GreenYellow} pt-5` }>(scroll down to see more profiles after events)</h4>
      </Row>
      <div className='flex-row d-flex justify-content'>
        {profiles.slice(0, 2).map((profile) => (
          <Profile
            key={profile.id}
            profile={profile}
            mobile={mobile}
          />
        ))}
      </div>
    </>
  );

  const otherProfilesSidebarDeskTop = (
    <>
      <h3 className={styles.GreenYellow}>Last Logins:</h3>
      {profiles.map((profile) => (
        <Profile
          key={profile.id}
          profile={profile}
          mobile={mobile}
        />
      ))}
    </>
  );

  return (
    mobile ? null : (
      <Container
        className={`${appStyles.Content} pt-5 ${mobile && "d-lg-none text-right mb-3"}`}>
        {!hasLoaded ? (
          <Asset spinner />
        ) : profiles.length ? (
          <>
            {currentUserProfileDeskTop}
            {otherProfilesSidebarDeskTop}
          </>
        ) : (
          <div>No profiles found.</div>
        )}
      </Container>
    )
  );
}

export default LatestFriendsLogIn;
