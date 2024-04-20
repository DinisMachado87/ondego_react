import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// React
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
// Axios
import Card from "react-bootstrap/Card";
import { Media } from "react-bootstrap";
import styles from "../../styles/Event.module.css";
import appStyles from "../../App.module.css";
// styles
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
// Components

const Event = (props) => {
  /**
   * destructure the event passed as a prop
   */
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
  const [tooltip, setTooltip] = useState("");
  const [currentPreviousUserChoice, setCurrentPreviousUserChoice] =
    useState(joining_status);
  // stores the previous user joining status choice and updates in State every time the user changes their choice

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

  const handleJoiningChoice = async (choice) => {
    /** Handle the user's click to change their joining status
     * by sending a POST or PUT request to the joinings instance in the API
     * and updating the event joining counts on the state
     */
    try {
      const currentUserJoiningThisEvent = (
        await axiosRes.get("/joinings/")
      ).data.results
        .filter((joining) => joining.event === id)
        .find((joining) => joining.owner === currentUser.username);
      if (currentUserJoiningThisEvent) {
        // stores the previous choice to update the event counts later
        if (currentUserJoiningThisEvent.status === choice) {
          // if the user clicks on the same status, do nothing
          return;
        } else {
          // if the user clicks on a different joining status update the choice with PUT
          await axiosReq.put(`/joinings/${currentUserJoiningThisEvent.id}/`, {
            event: id,
            status: choice,
          });
          updateEventCounts(currentPreviousUserChoice, choice);
          setCurrentPreviousUserChoice(choice);
        } // update the state accordingly
      } else {
        // if the user has not a joining instance yet, create a new one with POST
        await axiosReq.post("/joinings/", {
          event: id,
          owner: currentUser.username,
          status: choice,
        });
        updateEventCounts(currentPreviousUserChoice, choice);
        setCurrentPreviousUserChoice(choice);
      } // update the state accordingly
    } catch (err) {
      console.log(err);
    }
  };

  const choiceToCountMap = {
    1: "not_joining_count",
    2: "joining_count",
    3: "let_me_see_count",
  };

  const updateEventCounts = (currentPreviousUserChoice, newChoice) => {
    /** Update the joining choice counts in the event object
     * using the previous and new choice values
     * stored in the handleJoiningChoice function
     */
    setEvents((prevEvents) => ({
      ...prevEvents,
      results: prevEvents.results.map((event) => {
        if (event.id === id) {
          /** Maps this event and updates the event counts using the previous
           * and new choice variables stored in the handleJoiningChoice function
           */
          let updatedEvent = { ...event };
          if (currentPreviousUserChoice) {
            updatedEvent[choiceToCountMap[currentPreviousUserChoice]] -= 1;
          }
          if (newChoice) {
            updatedEvent[choiceToCountMap[newChoice]] += 1;
          }
          console.log(updatedEvent);
          return updatedEvent;
        } else {
          return event;
        }
      }),
    }));
  };

  const ChoiceButton = ({
    choice,
    tooltipText,
    count,
    handleJoiningChoice,
  }) => (
    <span onClick={() => handleJoiningChoice(choice, tooltipText)}>
      <i
        className={
          `fa fa-solid ${
            choice === "1"
              ? "fa-heart-circle-bolt"
              : choice === "2"
              ? "fa-rocket"
              : "fa-dice"
          } ` + (currentPreviousUserChoice === choice ? styles.Active : "")
        }></i>{" "}
      <p style={{ margin: 0, display: "inline-block" }}>{count}</p>
      {tooltip === tooltipText && (
        <div className={styles.Tooltip}>{tooltipText}</div>
      )}
    </span>
  );

  return (
    <Card
      onClick={() => history.push(`/events/${id}`)}
      style={{ backgroundImage: `url(${event_image})` }}
      className={`${appStyles.Pointer} ${styles.StretchedImage} m-5`}>
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
              <ChoiceButton
                choice='2'
                tooltipText='Joining'
                count={joining_count}
                handleJoiningChoice={handleJoiningChoice}
              />
              <ChoiceButton
                choice='3'
                tooltipText='Let me see'
                count={let_me_see_count}
                handleJoiningChoice={handleJoiningChoice}
              />
              <ChoiceButton
                choice='1'
                tooltipText='Cannot'
                count={not_joining_count}
                handleJoiningChoice={handleJoiningChoice}
              />
            </div>
          </div>
        </Card.Footer>
      </Media>
    </Card>
  );
};

export default Event;
