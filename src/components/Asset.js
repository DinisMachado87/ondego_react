import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";


const Asset = ({ spinner, src }) => {
	return (
		<div className={ `${styles.Asset} p-4` }>
			{ spinner && <Spinner animation="border" /> }
			{ src && <img className={ styles.AssetImage } src={ src } alt="placeholder" /> }
		</div>
	);
};

export default Asset;
