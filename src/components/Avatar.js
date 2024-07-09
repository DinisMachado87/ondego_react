import React from "react";
import styles from "../styles/Avatar.module.css";
import { Link } from "react-router-dom";

const Avatar = ({ src, height = 45, text, profile_id }) => {
  return (
    <Link
      to={`/profiles/${profile_id}`}
      onClick={(e) => e.stopPropagation()}>
      <span>
        <img
          className={styles.Avatar}
          src={src}
          height={height}
          width={height}
          alt='avatar'
        />
        {text && (
          <span className={styles.Text}>
            <p>{text}</p>
          </span>
        )}
      </span>
    </Link>
  );
};

export default Avatar;
