'use strict';

import React, { Component } from 'react';
import { getMoviePoster } from '../API/TMDBApi';

import {
	TouchableOpacity,
	StyleSheet,
  	Image,
 	Text,
  	View,
} from 'react-native';

class FilmItem extends Component {

	_displayFavoriteImage() {
    	if (this.props.isFilmFavorite) {
	      return (
	        <Image
	          style={styles.favorite_image}
	          source={require('../Images/ic_favorite.png')}
	        />
	      )
	    }
	  }
	
	  render() {
	  	const { film, displayDetailForFilm, isFilmFavorite } = this.props
	    return (
	    	<TouchableOpacity style={styles.container} onPress={ () => displayDetailForFilm(film.id) }>
	    		<Image style={styles.image} source={{uri: getMoviePoster(film.poster_path) }}/>
	    		<View style={styles.content_container}>
	    			<View style={styles.header_container}>
		    			{this._displayFavoriteImage()}
			    		<Text style={styles.title_text}>{film.title}</Text>
	    				<Text style={styles.vote_text}>{film.vote_average}</Text>
	    			</View>
	    			<View style={styles.description_container}>
		    			<Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
	    			</View>
	    			<View style={styles.date_container}>
	    				<Text style={styles.date_text}>Sorti le {film.release_date}</Text>
	    			</View>
	    		</View>
	    	</TouchableOpacity>
	    );
	  }
}

const styles = StyleSheet.create({
	container: {
		height: 190,
		flexDirection: 'row'
	},
	image: {
		height: 190,
		width: 120,
		margin: 5,
	},
	content_container: {
		flex: 1,
		margin: 5
	},
	header_container: {
		flexDirection: 'row',
		flex: 3
	},
	favorite_image: {
	    width: 25,
	    height: 25,
	    marginRight: 5
  	},
	title_text: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'black',
		flex: 1,
		flexWrap: 'wrap',
		paddingRight: 5
	},
	vote_text: {
		fontSize: 26,
		color: 'gray'
	},
	description_container: {
		flex: 7,
	},
	description_text: {
		fontStyle: 'italic',
		color: 'grey'
	},
	date_container: {
		flex: 1,
	},
	date_text: {
		fontSize: 14,
		textAlign: 'right'
	}
});


export default FilmItem;