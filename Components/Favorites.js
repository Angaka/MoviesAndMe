import React from 'react'
import { connect } from 'react-redux'

import FilmList from './FilmList';
import FilmItem from './FilmItem';
import Avatar from './Avatar'

import { StyleSheet, View, Button, Text } from 'react-native'

class Favorites extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParams', 'Favoris')
		}
	}

	render() {
		return (
			<View style={styles.main_container}>
				<View style={styles.avatar_container}>
		  			<Avatar/>
	  			</View>
	  			<FilmList
	  				films={this.props.favoriteFilms}
	  				navigation={this.props.navigation}
	  				favoriteList={true}
	  			/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
	},
	avatar_container: {
		alignItems: 'center'
	}
})

const mapStateToProps = state => {
	return {
		favoriteFilms: state.toggleFavorite.favoriteFilms
	}
}

export default connect(mapStateToProps)(Favorites)