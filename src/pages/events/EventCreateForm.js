import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import Upload from "../../assets/upload.jpg";

import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EventCreateForm() {
	const [errors, setErrors] = useState({});

	const [eventData, setEventData] = useState({
		what_title: "",
		what_content: "",
		where_place: "",
		where_address: "",
		when_start: "",
		when_end: "",
		intention: "",
		event_image: "",
	});

	const {
		what_title,
		what_content,
		where_place,
		where_address,
		when_start,
		when_end,
		intention,
		event_image,
	} = eventData;

	const imageInput = useRef(null);
	const history = useHistory();

	const handleChange = (event) => {
		setEventData({
			...eventData,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeImage = (event) => {
		if (event.target.files.length) {
			URL.revokeObjectURL(eventData.event_image);
			setEventData({
				...eventData,
				event_image: URL.createObjectURL(event.target.files[0]),
			});
		}
	};

	const textFields = (
		<div className='text-center OrangeBorder'>
			<Form.Group controlId='WhatTitle'>
				<Form.Label className='d-none'>What? (title)</Form.Label>
				<Form.Control
					type='text'
					placeholder='title'
					name='title'
					value={ what_title }
					onChange={ handleChange }
				/>
			</Form.Group>

			<Form.Group controlId='WhatContent'>
				<Form.Label className='d-none'>What? (content)</Form.Label>
				<Form.Control
					as='textarea'
					rows={ 3 }
					placeholder='content'
					name='content'
					value={ what_content }
					onChange={ handleChange }
				/>
			</Form.Group>

			<Form.Group controlId='WherePlace'>
				<Form.Label className='d-none'>Where? (place)</Form.Label>
				<Form.Control
					type='text'
					placeholder='place'
					name='place'
					value={ where_place }
					onChange={ handleChange }
				/>
			</Form.Group>

			<Form.Group controlId='WhereAddress'>
				<Form.Label className='d-none'>Where? (address)</Form.Label>
				<Form.Control
					type='text'
					placeholder='address'
					name='address'
					value={ where_address }
					onChange={ handleChange }
				/>
			</Form.Group>

			<Form.Group controlId='WhenStart'>
				<Form.Label className='d-none'>When? (start)</Form.Label>
				<Form.Control
					type='datetime-local'
					name='start'
					value={ when_start }
					onChange={ handleChange }
				/>
			</Form.Group>

			<Form.Group controlId='WhenEnd'>
				<Form.Label className='d-none'>When? (end)</Form.Label>
				<Form.Control
					type='datetime-local'
					name='end'
					value={ when_end }
					onChange={ handleChange }
				/>
			</Form.Group>

			<Form.Group controlId='Intention'>
				<Form.Label className='d-none'>Intention</Form.Label>
				<Form.Control
					type='text'
					placeholder='intention'
					name='intention'
					value={ intention }
					onChange={ handleChange }
				/>
			</Form.Group>

			{ errors && (
				<Alert variant='danger'>
					{ Object.keys(errors).map((key) => (
						<p key={ key }>{ errors[key] }</p>
					)) }
				</Alert>
			) }

			<Button
				className={ `${btnStyles.Button} ${btnStyles.Orange}` }
				onClick={ () => { } }
			>
				cancel
			</Button>
			<Button
				className={ `${btnStyles.Button} ${btnStyles.Orange}` }
				type='submit'
			>
				create
			</Button>
		</div>
	);

	return (
		<Form>
			<Row>
				<Col
					className='py-2 p-0 p-md-2'
					md={ 7 }
					lg={ 8 }
				>
					<Container
						className={ `${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center` }
					>
						<Form.Group className='text-center'>
							{ event_image ? (
								<>
									<figure>
										<Image
											className={ styles.Image }
											src={ event_image }
										/>
									</figure>
								</>
							) : (
								<Form.Label
									className='d-flex align-items-center'
									htmlFor='image-upload'
								>
									<Asset
										src={ Upload }
										message='Click to Upload an Image'
									/>
								</Form.Label>
							) }

							<Form.Label
								className={ `${btnStyles.Button} ${btnStyles.Orange}` } htmlFor="image-upload">
								{ event_image ? 'Change the image' : 'Click to add an image' }
								<Form.File
									id='image-upload'
									accept='image/*'
									onChange={ handleChangeImage }
									hidden
								/>
							</Form.Label>

						</Form.Group>
						<div className='d-md-none'>{ textFields }</div>
					</Container>
				</Col>
				<Col
					md={ 5 }
					lg={ 4 }
					className='d-none d-md-block p-0 p-md-2'
				>
					<Container
						className={ `${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center` }
					>{ textFields }</Container>
				</Col>
			</Row>
		</Form>
	);
}

export default EventCreateForm;
