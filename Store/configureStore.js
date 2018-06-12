import { createStore } from 'redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/avatarReducer'

const rootPersistConfig = {
	key: 'root',
	storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))