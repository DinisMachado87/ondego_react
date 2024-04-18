import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import styles from "../../styles/Event.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
    joining_count,
    comments_count,
    eventPage,
    cannot_count,
    let_me_see_count,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [joining_status, setJoiningStatus] = useState("3");
  const [tooltip, setTooltip] = useState("");

  const handleToggle = (status, tooltipText) => {
    setJoiningStatus(status);
    setTooltip(tooltipText);
  };

  return (
    <Card
      onClick={() => history.push(`/events/${id}`)}
      style={{ backgroundImage: `url(${event_image})` }}
      className={`${appStyles.Pointer} ${styles.StretchedImage}`}>
      <Media className={styles.Event}>
        <Card.Body
          className={`${styles.TextShadow} d-flex justify-content-between align-items-start`}>
          <div
          className={`${styles.Container} ${styles.EventBody}`}
          >
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
          <div
          className={styles.EventFooter}
          >
            <span onClick={() => handleToggle("2", "Joining")}>
              <i className='fa fa-solid fa-rocket'></i> {joining_count}
              {tooltip === "Joining" && (
                <div className={styles.Tooltip}>Joining</div>
              )}
            </span>
            <span onClick={() => handleToggle("3", "Let me see")}>
              <i className='fa fa-solid fa-user-clock'></i> {let_me_see_count}
              {tooltip === "Let me see" && (
                <div className={styles.Tooltip}>Let me see</div>
              )}
            </span>
            <span onClick={() => handleToggle("1", "Cannot")}>
              <i className='fa fa-solid fa-ban'></i> {cannot_count}
              {tooltip === "Cannot" && (
                <div className={styles.Tooltip}>Cannot</div>
              )}
            </span>
          </div>
        </Card.Footer>
      </Media>
    </Card>
  );
};

export default Event;
