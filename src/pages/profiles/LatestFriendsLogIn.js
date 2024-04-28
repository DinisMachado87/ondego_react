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
      <h3 className={ `${styles.GreenYellow} pt-5` }>Last Logins:</h3>
      <div
      className="flex-row d-flex justify-content"
      >
      { profiles.slice(0, 3).map((profile) => (
                <Profile
                  key={profile.id}
                  profile={profile}
                  mobile={mobile}
                />
      )) }
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
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-right mb-3"
      }`}>
      {profiles.length ? (
        mobile ? (
          <>
            {otherProfilesSidebarMobile}
          </>

        ) : (
          <>
            {currentUserProfileDeskTop}
            {otherProfilesSidebarDeskTop}
          </>
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default LatestFriendsLogIn;
