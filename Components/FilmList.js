import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			film: []
		}
	}

	_displayDetailForFilm = (idFilm) => {
		console.log("Display film " + idFilm)
    	// On a récupéré les informations de la navigation, on peut afficher le détail du film
    	this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
    }

    render() {
    	return (
    		<FlatList
    			style={styles.list}
	    		data={this.props.films}
	    		keyExtractor={(item) => item.id.toString()}
	    		renderItem={({item}) => <FilmItem film={item} 
	    		isFilmFavorite={(this.props.favoriteFilms.findIndex(film => film.id === item.id) !== -1) ? true : false} 
	    		displayDetailForFilm={this._displayDetailForFilm} /> }
	    		onEndReachedThreshold={0.5}
	    		onEndReached={() => {
	    			if (this.props.films.length > 0 && this.props.page < this.props.totalPages && !this.props.favoriteList) {
	    				this.props.loadFilms()
	    			}
	    			console.log('onEndReached') 
	    		}}
    		/>
    	)
    }
}

const styles = StyleSheet.create({
	list: {
		flex: 1
	}
})

const mapStateToProps = state => {
	return {
		favoriteFilms: state.toggleFavorite.favoriteFilms
	}
}

export default connect(mapStateToProps)(FilmList)