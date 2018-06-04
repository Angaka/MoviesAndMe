import React, { Component } from 'react';

import { getMovieDetailById } from '../API/TMDBApi'

import {
	ActivityIndicator,
  	StyleSheet,
  	Image,
  	Text,
  	View,
} from 'react-native';

class FilmDetail extends Component {

	constructor(props) {
		super(props)
		this.state = {
			film: undefined,
			isLoading: true
		}
	}

  	_displayLoading() {
  		if (this.state.isLoading) {
  			return(
  				<View style={styles.loading_container}>
  					<ActivityIndicator size='large'/>
  				</View>
			)
  		}
  	}

	render() {
		return (
			<View style={styles.main_container}>
				<Text>{this.props.navigation.state.params.idFilm}</Text>
	  			{this._displayLoading()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
	},
	loading_container: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
})

export default FilmDetail