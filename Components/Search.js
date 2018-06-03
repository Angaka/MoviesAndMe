'use strict';

import React, { Component } from 'react';
import data from '../Helpers/filmsData';
import FilmItem from './FilmItem';

import { getMoviesFromQuery } from '../API/TMDBApi';

import {
	ActivityIndicator,
	StyleSheet,
	TextInput,
	Text,
	View,
	Button,
	FlatList
} from 'react-native';

class Search extends Component {

	constructor(props) {
	  	super(props);
  		this.searchedText =  ''
  		this.page = 0
  		this.totalPages = 0
	  	this.state = { 
	  		films: [],
	  		isLoading: false
	  	};
	}

	_searchTextInputChanged(text) {
		this.searchedText = text
	}

	_loadFilms() {
		console.log(this.searchedText);
		if (this.searchedText.length > 0) {
			this.setState({ isLoading: true })
	  		getMoviesFromQuery(this.searchedText, this.page + 1)
	  			.then((data) => {
	  				this.page = data.page
	  				this.totalPages = data.total_pages
	  				this.setState({ 
	  					films: [ ...this.state.films, ...data.results ], // this.state.films.concat(data.results)
	  					isLoading: false
					})
				})
  		}
  	}

  	_searchFilms() {
  		this.page = 0
  		this.totalPages = 0
  		this.setState({
  			films: []
  		})
 		console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
   		this._loadFilms()
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
  		console.log(this.state.isLoading)
    	return (
			<View style={styles.main_container}>
	  			<TextInput placeholder="Titre du film" 
	  				onChangeText={(text) => this._searchTextInputChanged(text)} 
	  				onSubmitEditing={(text) => this._searchFilms()} 
	  				style={[styles.textinput, { marginBottom: 10 }]}/>
	  			<Button title="Rechercher" onPress={() => { this._searchFilms() }} style={styles.button}/>
	  			<FlatList
	  				data={this.state.films}
	  				keyExtractor={(item) => item.id.toString()}
	  				renderItem={({item}) => <FilmItem film={item}/> }
	  				onEndReachedThreshold={0.5}
	  				onEndReached={() => {
	  					if (this.state.films.length > 0 && this.page < this.totalPages) {
	  						this._loadFilms()
	  					}
	  					console.log('onEndReached') 
	  				}}
	  			/>
	  			{this._displayLoading()}
	  		</View>
	    );
  	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		marginTop: 20,
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
	textinput: {
		marginLeft: 5, 
		marginRight: 5, 
		height: 50, 
		borderColor: '#000000', 
		borderWidth: 1, 
		paddingLeft: 5	
	},
	button: {
	 height: '50'	
	}
});


export default Search;