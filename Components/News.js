import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import FilmList from './FilmList'

import { getLatestMovies } from '../API/TMDBApi'

class News extends React.Component {
	
	constructor(props) {
	  super(props);
	  this.page = 0
	  this.totalPages = 0
	
	  this.state = {
	  	films: [],
	  	isLoading: false
	  };

	  this._displayDetailForFilm = this._displayDetailForFilm.bind(this)
	  this._loadFilms = this._loadFilms.bind(this)
	}

	componentDidMount() {
		this._loadFilms()
	}

	_displayDetailForFilm(idFilm) {
		this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
	}

	_loadFilms() {
		this.setState({ isLoading: true })
		getLatestMovies(this.page+1)
			.then((data) => {
				this.page = data.page
				this.totalPages = data.total_pages
				this.setState({
					films: [...this.state.films, ...data.results],
					isLoading: false
				})
			})
	}

	_displayLoading() {
		if (this.state.isLoading) {
			return (
				<View style={styles.loading_container}>
					<ActivityIndicator size='large'/>
				</View>
			)
		}
	}

	render() {
		return (
			<View style={styles.main_container}>
				<FilmList
					films={this.state.films}
					page={this.page}
					loadFilms={this._loadFilms}
					totalPages={this.totalPages}
					favoriteList={false}
					navigation={this.props.navigation}
				/>
				{this._displayLoading()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
	},
	loading_container: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	}
})

export default News