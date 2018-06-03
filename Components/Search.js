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
	  		getMoviesFromQuery(this.searchedText)
	  			.then((data) => {
	  				this.setState({ 
	  					films: data.results,
	  					isLoading: false
					})
				})
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
  		console.log(this.state.isLoading)
    	return (
			<View style={styles.main_container}>
	  			<TextInput placeholder="Titre du film" 
	  				onChangeText={(text) => this._searchTextInputChanged(text)} 
	  				onSubmitEditing={(text) => this._loadFilms()} 
	  				style={[styles.textinput, { marginBottom: 10 }]}/>
	  			<Button title="Rechercher" onPress={() => { this._loadFilms() }} style={styles.button}/>
	  			<FlatList
	  				data={this.state.films}
	  				keyExtractor={(item) => item.id.toString()}
	  				renderItem={({item}) => <FilmItem film={item}/>}
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