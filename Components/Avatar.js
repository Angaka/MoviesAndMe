import React from 'react'
import { connect } from 'react-redux'

import ImagePicker from 'react-native-image-picker'

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class Avatar extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this._avatarClicked = this._avatarClicked.bind(this)
	}

	_avatarClicked() {
		ImagePicker.showImagePicker({}, (response) => {
			if (response.didCancel) {
				console.log('Utilisateur a annulé');
			} else if (response.error) {
				console.log('Erreur', response.error);
			} else {
				let requireSource = { uri: response.uri }
				const action = { type: 'SET_AVATAR', value: requireSource }
				this.props.dispatch(action)				
			}
		})
	}

	render() {
		return (
			<TouchableOpacity style={styles.main_container} onPress={() => this._avatarClicked() }>
				<Image style={styles.avatar} source={this.props.avatar}/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		width: 100,
		height: 100,
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		width: 100,
		height: 100,
		borderWidth: 2,
		borderRadius: 50,
		borderColor: '#9B9B9B',
	}
})

const mapStateToProps = state => {
	return {
		avatar: state.setAvatar.avatar
	}
}

export default connect(mapStateToProps)(Avatar)