const initialState = { favoriteFilms: [] }

function toggleFavorite(state = initialState, action) {
	let nextState

	switch (action.type) {
		case 'TOGGLE_FAVORITE':
			const favoriteFilmsIndex = state.favoriteFilms.findIndex(item => item.id === action.value.id)
			if (favoriteFilmsIndex !== -1) {
				nextState = {
					...state,
					favoriteFilms: state.favoriteFilms.filter((item, index) => index !== favoriteFilmsIndex)
				}   
			} else {
				nextState = {
					...state,
					favoriteFilms: [...state.favoriteFilms, action.value]
				}
			}
			return nextState || state
		default:
			return state
	}
}

export default toggleFavorite