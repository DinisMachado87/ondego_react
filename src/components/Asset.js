import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";


const Asset = ({ spinner, src, message }) => {
	return (
		<div className={ `${styles.Asset} p-4` }>
			{ spinner && <Spinner animation="border" /> }
			{ src && <img className={ styles.AssetImage } src={ src } alt={ message } /> }
		</div>
	);
};

export default Asset;
