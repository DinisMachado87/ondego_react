import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import styles from "../../styles/Event.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

const Event = (props) => {
  const {
    id,
    owner,
    created_at,
    updated_at,
    what_title,
    what_content,
    where_place,
    where_address,
    when_start,
    when_end,
    intention,
    event_image,
    profile_id,
    profile_image,
    joining_id,
    joining_status,
    joining_count,
    joining_let_me_see_count,
    joining_cannot_count,
    comments_count,
    eventPage,
    cannot_count,
    let_me_see_count,
    setEvents,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [joiningId, setJoiningId] = useState(joining_id);

  const [tooltip, setTooltip] = useState("");
  const [selectedJoiningStatus, setSelectedJoiningStatus] =
    useState(joining_status);

  const getTooltipText = (status) => {
    switch (status) {
      case "1":
        return "baïl";
      case "2":
        return "ön dë gö";
      case "3":
        return "Let me thïnk";
      default:
        return "";
    }
  };


  const handleJoiningChoice = async (choice, tooltip) => {
    console.log("called");
    try {
      let data;
      if (joiningId) {
        console.log("put");
        // If the user has already joined the event, update the existing joining.
        ({ data } = await axiosReq.put(`/joinings/${joiningId}/`, {
          joining_status: choice,
        }));
      } else {
        console.log("post");
        // If the user has not joined the event, create a new joining.
        ({ data } = await axiosReq.post("/joinings/", {
          event: id,
          joining_status: choice,
        }));
        // Update joiningId in the state.
        setJoiningId(data.id);
      }
      console.log("Data:", data);
      console.log("Data ID:", data.id);

      setSelectedJoiningStatus(choice);
      setTooltip(tooltip);

      // Update the counts for the joining statuses.
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) =>
          event.id === id
            ? {
                ...event,
                [`${selectedJoiningStatus}_count`]:
                  event[`${selectedJoiningStatus}_count`] - 1,
                [`${choice}_count`]: event[`${choice}_count`] + 1,
              }
            : event
        ),
      }));
    } catch (err) {
      console.log("Error in handleJoiningChoice:", err);
    }
  };

  return (
    <Card
      onClick={() => history.push(`/events/${id}`)}
      style={{ backgroundImage: `url(${event_image})` }}
      className={`${appStyles.Pointer} ${styles.StretchedImage}`}>
      <Media className={styles.Event}>
        <Card.Body
          className={`${styles.TextShadow} d-flex justify-content-between align-items-start`}>
          <div className={`${styles.Container} ${styles.EventBody}`}>
            <Card.Link to={`/profiles/${profile_id}`}>
              <Avatar
                src={profile_image}
                height={55}
              />
              {owner}
            </Card.Link>

            <h3>{what_title && <div className='fw-bold'>{what_title}</div>}</h3>
            <h4>{intention && <span>{intention}</span>}</h4>
            <p>{what_content && <span>{what_content}</span>}</p>
            <p>{where_place && <span>{where_place}</span>}</p>
            <p>{where_address && <span>{where_address}</span>}</p>

            <p>{when_start && <span>start: {when_start}</span>}</p>
            <p>{when_end && <span>end: {when_end}</span>}</p>

            <div>created: {created_at}</div>
            <div>updated: {updated_at}</div>

            {is_owner && (
              <div>
                <Link to={`/events/${id}/edit`}>Edit</Link>
              </div>
            )}
            {is_owner && (
              <div>
                <Link to={`/events/${id}/delete`}>Delete</Link>
              </div>
            )}
            <div className={`${styles.flexEnd}`}>
              <img
                alt='event'
                src={event_image}
                className={styles.ProportionalImage}
              />
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className={styles.EventFooter}>
            <div className={styles.EventFooter}>
              <span onClick={() => handleJoiningChoice("2", "Joining")}>
                <i
                  className={
                    "fa fa-solid fa-rocket " +
                    (selectedJoiningStatus === "2" ? styles.Active : "")
                  }></i>{" "}
                {joining_count}
                {tooltip === "Joining" && (
                  <div className={styles.Tooltip}>Joining</div>
                )}
              </span>
              <span onClick={() => handleJoiningChoice("3", "Let me see")}>
                <i
                  className={
                    "fa fa-solid fa-dice " +
                    (selectedJoiningStatus === "3" ? styles.Active : "")
                  }></i>{" "}
                {let_me_see_count}
                {tooltip === "Let me see" && (
                  <div className={styles.Tooltip}>Let me see</div>
                )}
              </span>
              <span onClick={() => handleJoiningChoice("1", "Cannot")}>
                <i
                  className={
                    "fa fa-solid fa-heart-circle-bolt " +
                    (selectedJoiningStatus === "1" ? styles.Active : "")
                  }></i>{" "}
                {cannot_count}
                {tooltip === "Cannot" && (
                  <div className={styles.Tooltip}>Cannot</div>
                )}
              </span>
            </div>
          </div>
        </Card.Footer>
      </Media>
    </Card>
  );
};

export default Event;
