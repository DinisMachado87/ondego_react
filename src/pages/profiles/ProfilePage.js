import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import LatestFriendsLogIn from "./LatestFriendsLogIn";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Event from "../events/Event";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import EditProfileForm from "./ProfileEditForm";
import ProfileButtons from "./ProfileButtons";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const {
    setProfileData,
    handleCancelFriendRequest,
    handleConsentFriendRequest,
    handleCreateFriendRequest,
    handleNotRightNowFriendRequest,
    handleUnfriend,
  } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profileEvents, setProfileEvents] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileEvents }] =
          await Promise.all([
            // Fetches the profile data and the events organized by the profile owner
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/events/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          // Sets the profile data and the events organized by the profile owner
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileEvents(profileEvents);
        // Sets the events organized by the profile owner
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Container>
        <Row className='justify-content-center no-gutters text-center'>
          <Image
            className={`${styles.ProfileImage} mx-auto d-block`}
            roundedCircle
            src={profile?.image}
          />
        </Row>
        <Row className='justify-content-center no-gutters'>
          <Col className='text-center'>
            <h3 className='m-2'>{profile?.owner}</h3>
          </Col>
        </Row>

        { is_owner && <EditProfileForm /> }
        
        { profile?.is_owner &&
          <ProfileEditDropdown id={ profile?.id } />
        }

        <Row className='justify-content-center no-gutters'>
          <Col
            xs={3}
            className='my-2 text-center'>
            <div>{ profile?.events_count }</div>
            <div>organized events</div>
          </Col>
          <Col
            xs={3}
            className='my-2 text-center'>
            <div>{ profile?.joined_events_count }</div>
            <div>joined events</div>
          </Col>
          <Col
            xs={3}
            className='my-2 text-center'>
            <div>{ profile?.friends_count }</div>
            <div>friends</div>
          </Col>
        </Row>

        <ProfileButtons
          /** Profile buttons component renders diferent buttons
           * depending on the user's relationship with the profile owner
           */
          is_owner={is_owner}
          profile={profile}
          handleCancelFriendRequest={handleCancelFriendRequest}
          handleConsentFriendRequest={handleConsentFriendRequest}
          handleCreateFriendRequest={handleCreateFriendRequest}
          handleNotRightNowFriendRequest={handleNotRightNowFriendRequest}
          handleUnfriend={handleUnfriend}
        />
        {profile?.content && <Col className='p-3'>{profile.content}</Col>}
      </Container>
    </>
  );

  const mainProfileEvents = (
    /** Main profile events component renders the events organized
     * by the profile owner
     */
    <>
      <hr />
      <p className='text-center'>{`${profile?.owner}' events`}</p>
      <hr />
      <Row>
        {profileEvents ? (
          <InfiniteScroll
            children={profileEvents.results.map((event) => (
              <Event
                key={event.id}
                {...event}
                setEvents={setProfileEvents}
              />
            ))}
            dataLength={profileEvents.results.length}
            loader={<Asset spinner />}
            hasMore={!!profileEvents.next}
            next={() => fetchMoreData(profileEvents, setProfileEvents)}
          />
        ) : (
          <Asset
            src={NoResults}
            message={`No results found, ${profile?.owner} did not arrange events yet.`}
          />
        )}
      </Row>
    </>
  );

  return (
    <Row>
      <Col
        className='py-2 p-0 p-lg-2'
        lg={8}>
        <LatestFriendsLogIn mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileEvents}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col
        lg={4}
        className='d-none d-lg-block p-0 p-lg-2'>
        <LatestFriendsLogIn />
      </Col>
    </Row>
  );
}

export default ProfilePage;
