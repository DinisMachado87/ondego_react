import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  return (
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
          <h3>{text}</h3>
        </span>
      )}
    </span>
  );
};

export default Avatar;
