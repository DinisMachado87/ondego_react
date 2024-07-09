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
            <p>{text}</p>
          </span>
        )}
      </span>
  );
};

export default Avatar;
