import React, { useState } from 'react'
import styles from "../../styles/Comment.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { Col, Media, Row } from 'react-bootstrap';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosReq } from '../../api/axiosDefaults';
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    id,
    setComments,
    setEvent,
    owner,
    message,
    updated_at,
    profile_image,
    profile_id,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = () => {
    try {
      axiosReq.delete(`/comments/${id}/`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      setEvent((prevEvent) => ({
        ...prevEvent,
        comments_count: prevEvent.comments_count - 1,
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Media className={styles.Comment}>
        <Media.Body className='m-1'>
          {owner ? (
            <Row className='p-1'>
              <Col className='col-1'>
                <MoreDropdown
                  handleDelete={handleDelete}
                  handleEdit={() => setShowEditForm(true)}
                />
              </Col>
              <Link
                to={`/profiles/${profile_id}`}
                className='col-1'>
                <Avatar src={profile_image} />
              </Link>
              {showEditForm ? (
                <CommentEditForm
                  id={id}
                  profile_id={profile_id}
                  content={message}
                  profileImage={profile_image}
                  setComments={setComments}
                  setShowEditForm={setShowEditForm}
                />
              ) : (
                <p className='col-10 mt-2'>
                  {owner}: {message}
                  <span className={styles.UpdatedAt}>
                    {"  "}
                    {updated_at}
                  </span>{" "}
                </p>
              )}
            </Row>
          ) : (
            <div className='row'>
              <p className='col-10 mt-2'>
                {message}
                <span className={styles.UpdatedAt}>
                  {"  "}
                  {updated_at}
                </span>
              </p>
              <Link
                to={`/profiles/${profile_id}`}
                className='col-1'>
                <Avatar src={profile_image} />
              </Link>
            </div>
          )}
        </Media.Body>
      </Media>
    </div>
  );
}

export default Comment
