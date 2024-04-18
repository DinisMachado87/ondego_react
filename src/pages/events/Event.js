import React from "react";

import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

import styles from "../../styles/Event.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
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
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  return (
    <ListGroup
      as='ol'
      numbered
      onClick={() => history.push(`/events/${id}`)}
      className={appStyles.Pointer}>
      <ListGroup.Item
        as='li'
        className={`${styles.TextShadow} ${styles.StretchedImage} d-flex justify-content-between align-items-start`}
        style={{
          backgroundImage: `url(${event_image})`,
        }}>
        <Media className={styles.Event}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar
              src={profile_image}
              height={55}
            />
            {owner}
          </Link>
          <div
            className='ms-2 me-auto'
            style={{
              color: "white",
            }}>
            {what_title && <div className='fw-bold'>{what_title}</div>}
            {intention && <span>{intention}</span>}
          </div>
          <div
            className='ms-2 me-auto'
            style={{
              color: "white",
            }}>
            {what_content && <span>{what_content}</span>}
            {when_start && <span>{when_start}</span>}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
            }}>
            <img
              alt='event'
              src={event_image}
              className={styles.ProportionalImage}
            />
          </div>
          {joining_count && (
            <Badge
              bg='primary'
              pill>
              {" "}
              {`${joining_count} joining`}{" "}
            </Badge>
          )}
          <div>
            <div>created: {created_at}</div>
            <div>updated: {updated_at}</div>
						{ is_owner && <Link to={ `/events/${id}/edit` }>Edit</Link> }
						<div className="styles.PostBar">
							{ is_owner ? (
								<OverlayTrigger placement="top" overlay={ <Tooltip>You can't join your own event!</Tooltip>} >
									<i className="fa-solid fa-rocket"></i>
								</OverlayTrigger>
							) : joining_id ? (
									<span onClick={ () => { } }>
										<i className={`fa-solid fa-rocket ${styles.Join}`}></i><span>joïn</span>
									</span>
								) : currentUser ? (
									<span onClick={ () => { } }>
										<i className={`fa-solid fa-rocket ${styles.JoinShadow}`}></i><span>baïl</span>
									</span>
								) : (
								<i className="fa-solid fa-rocket"></i>
							)}
							{ joining_count }
								
						</div>
          </div>
        </Media>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Event;
