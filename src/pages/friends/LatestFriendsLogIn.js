import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

const LatestFriendsLogIn = ({ mobile }) => {
  const { latestFriendsLogIn } = useProfileData();


  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}>
      {latestFriendsLogIn.results.length ? (
        <>
          {mobile ? (
            <div className='d-flex justify-content-around'>
              {latestFriendsLogIn.results.slice(0, 4).map((profile) => (
                <Profile
                  key={profile.id}
                  profile={profile}
                  mobile={mobile}
                />
              ))}
            </div>
          ) : (
            latestFriendsLogIn.results.map((profile) => (
              <Profile
                key={profile.id}
                profile={profile}
                mobile={mobile}
              />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default LatestFriendsLogIn;
