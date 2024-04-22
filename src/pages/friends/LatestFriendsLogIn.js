import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "./Profile";

const LatestFriendsLogIn = ({mobile}) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    latestFriendsLogIn: { results: [] },
  });
  const { latestFriendsLogIn } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/?ordering=-last_login");
        setProfileData((prevState) => ({
          ...prevState,
          latestFriendsLogIn: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

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
