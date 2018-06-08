import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
	ActivityIndicator,
  	StyleSheet,
  	Image,
  	TouchableOpacity,
  	Text,
  	View,
  	ScrollView
} from 'react-native';

import { getMoviePoster, getMovieDetailById } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends Component {

	constructor(props) {
		super(props)
		this.state = {
			film: undefined,
			isLoading: true
		}
	}

	componentDidMount() {
		getMovieDetailById(this.props.navigation.state.params.idFilm).then((data) => {
			this.setState({
				film: data,
				isLoading: false
			})
		})
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps : ")
		console.log(nextProps.favoriteFilms);
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

  	_toggleFavorite() {
  		const action = { type: 'TOGGLE_FAVORITE', value: this.state.film }
  		this.props.dispatch(action)
  	}

  	_displayFavoriteImage() {
  		var sourceImage = require('../Images/ic_favorite_border.png')
  		if (this.props.favoriteFilms.findIndex(item => item.id === this.state.film.id) !== -1) {
  			sourceImage = require('../Images/ic_favorite.png')
  		}
  		return (
  			<Image
  				style={styles.favorite_image}
  				source={sourceImage} />
  		)
  	}

  	_displayFilm() {
  		if (this.state.film != undefined) {
  			console.log(this.state.film.poster_path);
  			return(
  				<ScrollView style={styles.main_container}>
  					<Image style={styles.image} source={{ uri: getMoviePoster(this.state.film.backdrop_path) }}/>
  					<Text style={styles.title_text}>{this.state.film.title}</Text>
  					<TouchableOpacity style={styles.favorite_container} title='Favoris' onPress={() => this._toggleFavorite()}>
  						{this._displayFavoriteImage()}
  					</TouchableOpacity>
  					<Text style={styles.overview_text}>{this.state.film.overview}</Text>
  					<Text style={styles.default_text}>Sorti le {moment(new Date(this.state.film.release_date)).format('DD/MM/YYYY')}</Text>
  					<Text style={styles.default_text}>Note : {this.state.film.vote_average} / 10</Text>
  					<Text style={styles.default_text}>Nombre de votes : {this.state.film.vote_count}</Text>
  					<Text style={styles.default_text}>Budget : {numeral(this.state.film.budget).format('0,0[.]00 $')}</Text>
  					<Text style={styles.default_text}>Genre(s) : {this.state.film.genres.map((genre) => {
  						return genre.name
  					}).join(' / ')}
  					</Text>
  					<Text style={styles.default_text}>Companie(s) : {this.state.film.production_companies.map((company) => {
  						return company.name
  					}).join(' / ')}
  					</Text>
  				</ScrollView>
			)
  		} 
  	}

	render() {
		console.log(this.props)
		return (
			<View style={styles.main_container}>
				{this._displayFilm()}
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
	image: {
		height: 180,
		flex: 1,
		marginBottom: 10,
	},
	title_text: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 24,
		flexWrap: 'wrap',
		color: 'black',
		flex: 1,
		marginLeft: 5,
		marginRight: 5
	},
	favorite_image: {
		width: 40,
		height: 40
	},
	favorite_container: {
		alignItems: 'center'
	},
	overview_text: {
		color: 'grey',
		fontStyle: 'italic',
		fontSize: 14,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		marginBottom: 10
	},
	default_text: {
		color: 'black',
		fontSize: 14,
		marginLeft: 5,
		marginRight: 5,
	}
})

const mapStateToProps = state => {
	return {
		favoriteFilms: state.favoriteFilms
	}
}

export default connect(mapStateToProps)(FilmDetail)