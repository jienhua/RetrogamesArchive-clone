import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import { Form } from '../components';
import * as gamesActionCreators from '../actions/games';
import * as filestackActionCreators from '../actions/filestack';

class AddGameContainer extends Component {
	constructor (props) {
		super(props);
		// initial state
		// this.state = { newGame: {}};
		// Bind this (context) to the functions to be passed down to the children components
		this.submit = this.submit.bind(this);
		this.uploadPicture = this.uploadPicture.bind(this);
		// this.setGame = this.setGame.bind(this);
	}

	// submit () {
	// 	// We create the newGame object to be posted to the server
	// 	const newGame = Object.assign({}, { picture: $('#picture').attr('src') }, this.state.newGame);
	// 	fetch('http://localhost:8080/games', {
	// 		headers: new Headers({
	// 			'Content-Type': 'application/json'
	// 		}),
	// 		method: 'POST',
	// 		body: JSON.stringify(newGame)
	// 	})
	// 	.then(res=>res.json())
	// 	.then(data=>{
	// 		console.log(data.message);
	// 		// We go back to the games list view
	// 		hashHistory.push('/games');
	// 	});
	// }

	// Dispatch POST_GAME to the saga and change the view
	submit (event) {
		event.preventDefault();
		this.props.gamesActions.postGame();
		hashHistory.push('/games');
	}

	// uploadPicture () {
	// 	filepicker.pick (
	// 		{
	// 			mimetype: 'image/*', // Cannot upload other files but images
	// 			container: 'modal',
	// 			services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
	// 			openTo: 'COMPUTER' // First choice to upload files from
	// 		},
	// 		function (Blob) {
	// 			console.log(JSON.stringify(Blob));
	// 			$('#picture').attr('src', Blob.url);
	// 		},
	// 		function (FPError) {
	// 			console.log(FPError.toString());
	// 		}
	// 	);
	// }

	// Dispatch UPLOAD_PICTURE to the filestack saga
	uploadPicture () {
		this.props.filestackActions.uploadPicture();
	}

	// We make sure to keep the state up-to-date to the latest input values
	// setGame () {
	// 	const newGame = {
	// 		name: document.getElementById('name').value,
	// 		description: document.getElementById('description').value,
	// 		year: document.getElementById('year').value,
	// 		picture: $('#picture').attr('src')
	// 	};
	// 	console.log(newGame)
	// 	this.setState({newGame});
	// }

	// render () {
	// 	return <Form submit={this.submit} uploadPicture={this.uploadPicture} setGame={this.setGame} />
	// }
	render () {
		const { picture } = this.props;
		return (
			<Form 
				handleSubmit={this.submit}
				picture={picture}
				uploadPicture={this.uploadPicture}
			/>
		);
	}
}

function mapStateToProps (state) {
	return {
		// We access the state to retrieve the url and show the preview of the image in the form
		picture: state.getIn(['filestack', 'url'], '')
	}
}

function mapDispatchToProps (dispatch) {
	return {
		// we get the actions to dispatch POST_GAME actions and UPLOAD_PICTURE too
		gamesActions: bindActionCreators(gamesActionCreators, dispatch),
		filestackActions: bindActionCreators(filestackActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGameContainer);