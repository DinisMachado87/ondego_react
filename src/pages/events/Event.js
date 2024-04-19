import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import styles from "../../styles/Event.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

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
    let_me_see_count,
    not_joining_count,
    comments_count,
    eventPage,
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
    console.log("Choice:", choice);

    try {
      const joinings = await axiosRes.get("/joinings/");
      console.log("Joinings:", joinings.data.results);

      const joiningsForThisEvent = joinings.data.results.filter(
        (joining) => joining.event === id
      );

          for (let joining of joiningsForThisEvent) {
            console.log("Joining:", joining);
            console.log(
              "Joining owner:", joining.owner, 'Current User:', currentUser.username,
              'Event:', joining.event, 'ID:', id
            );
            if (joining.owner === currentUser.username) {
              const currentUserJoiningThisEvent = joining;
              console.log("currentUserJoiningThisEvent:", currentUserJoiningThisEvent);
              if (currentUserJoiningThisEvent.status === choice) {
                console.log("Already in this status");
                return;
              } else {
                console.log("Put request to change status", currentUserJoiningThisEvent);
                const putReq = await axiosReq.put(`/joinings/${currentUserJoiningThisEvent.id}/`, {
                  event: id,
                  status: choice,
                });
                console.log("Joining status changed:", putReq.data);
              }
            } else {
              console.log("Post request to create a new joining");
              const postreq = await axiosReq.post("/joinings/", {
                event: id,
                owner: currentUser.username,
                status: choice,
              });
              console.log("New joining created:", postreq.data);
            }
          }
      setTooltip(tooltip);
      setSelectedJoiningStatus(choice);
      setJoiningId(joining_id);
    }
    catch (err) {
      console.log(err);
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
              <span onClick={() => handleJoiningChoice("1", "bail")}>
                <i
                  className={
                    "fa fa-solid fa-heart-circle-bolt " +
                    (selectedJoiningStatus === "1" ? styles.Active : "")
                  }></i>{" "}
                {not_joining_count}
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
