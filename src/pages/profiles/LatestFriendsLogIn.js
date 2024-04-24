import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Profile from "./Profiles";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/LatestFriendsLogIn.module.css";

const LatestFriendsLogIn = ({ mobile }) => {
  const currentUser = useCurrentUser();
  console.log(currentUser);
  const { latestFriendsLogIn } = useProfileData();
  const profiles = latestFriendsLogIn.results
    ? currentUser
      ? latestFriendsLogIn.results.filter(
          (profile) => profile.id !== currentUser.pk
        )
      : latestFriendsLogIn.results
    : [];

  const currentUserProfile =
    currentUser && latestFriendsLogIn.results
      ? latestFriendsLogIn.results.filter(
          (profile) => profile.id === currentUser.pk
        )
      : [];

  return (
    <>
      <Container
        // Current user profile
        className={`${appStyles.Content} ${
          mobile && "d-lg-none text-center mb-3"
        }`}>
        {currentUserProfile.length ? (
          <>
            {mobile ? (
              <>
                <h3 className={styles.GreenYellow}>Your Profile</h3>
                <div className='d-flex justify-content-around'>
                  {currentUserProfile.map((currentUser) => (
                    <Profile
                      key={currentUser.id}
                      profile={currentUser}
                      mobile={mobile}
                    />
                  ))}
                </div>
              </>
            ) : (
              currentUserProfile.map((currentUser) => (
                <>
                  <h3 className={styles.GreenYellow}>Your Profile</h3>
                  <Profile
                    key={currentUser.id}
                    profile={currentUser}
                    mobile={mobile}
                  />
                </>
              ))
            )}
          </>
        ) : null }
      </Container>
      <Container
        // Friends' profiles last logged in
        className={`${appStyles.Content} ${
          mobile && "d-lg-none text-center mb-3"
        }`}>
        {profiles.length ? (
          <>
            {mobile ? (
              <>
                <h3 className={styles.GreenYellow}>Last Logins:</h3>
                <div className='d-flex justify-content-around'>
                  {profiles.slice(0, 4).map((profile) => (
                    <Profile
                      key={profile.id}
                      profile={profile}
                      mobile={mobile}
                    />
                  ))}
                </div>
              </>
            ) : (
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
            )}
          </>
        ) : (
          <Asset spinner />
        )}
      </Container>
    </>
  );
};

export default LatestFriendsLogIn;
