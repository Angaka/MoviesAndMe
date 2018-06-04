import React, { Component } from 'react';

import {
	ActivityIndicator,
  	StyleSheet,
  	Image,
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

  	_displayLoading() {
  		if (this.state.isLoading) {
  			return(
  				<View style={styles.loading_container}>
  					<ActivityIndicator size='large'/>
  				</View>
			)
  		}
  	}

  	_displayFilm() {
  		if (this.state.film != undefined) {
  			console.log(this.state.film.poster_path);
  			return(
  				<ScrollView style={styles.main_container}>
  					<Image style={styles.image} source={{ uri: getMoviePoster(this.state.film.backdrop_path) }}/>
  					<Text style={styles.title_text}>{this.state.film.title}</Text>
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

export default FilmDetail