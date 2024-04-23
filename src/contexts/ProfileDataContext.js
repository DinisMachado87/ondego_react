import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    latestFriendsLogIn: { results: [] },
  });
  const currentUser = useCurrentUser();

  const handleUnfriend = async (clickedProfile) => {
    try {
      await axiosReq.delete(`/friends/${clickedProfile.id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [] },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleConsentFriendRequest = async (clickedProfile) => {
    try {
      const currentProfile = await axiosReq.get(
        `/friends_requests/${clickedProfile.id}/`
      );

      const updatedProfile = {
        ...currentProfile,
        is_approved: true,
      };

      const { data } = await axiosReq.put(
        `/friends_requests/${clickedProfile.id}/`,
        updatedProfile
      );

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [data] },
      }));
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleNotRightNowFriendRequest = async (clickedProfile) => {
    try {
      await axiosReq.delete(`/friends_requests/${clickedProfile.id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [] },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelFriendRequest = async (clickedProfile) => {
    try {
      await axiosReq.delete(`/friends_requests/${clickedProfile.id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [] },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateFriendRequest = async (clickedProfile) => {
    try {
      const { data } = await axiosReq.post(`/friends_requests/`, {
        to_user: clickedProfile.owner,
      });
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [data] },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      /**
       * This async function fetches the latest friends log in data
       * then sets the profile data
       */
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-owner__last_login"
        );
        setProfileData((prevState) => ({
          ...prevState,
          latestFriendsLogIn: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{
          setProfileData,
          handleCancelFriendRequest,
          handleConsentFriendRequest,
          handleCreateFriendRequest,
          handleNotRightNowFriendRequest,
          handleUnfriend,
        }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
