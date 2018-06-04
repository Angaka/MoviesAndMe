const BASE_URL = 'https://api.themoviedb.org/3'
const API_TOKEN = "863d189692081dd1daf38b7bf7512216"

export function getMoviesFromQuery (text, page) {
	const url = BASE_URL + '/search/movie/?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
	return fetch(url)
		.then((res) => res.json())
		.catch((err) => console.log(err))
}

export function getMovieDetailById(id) {
	const url = BASE_URL + '/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
	return fetch(url)
		.then((res) => res.json())
		.catch((err) => console.log(err))
}

export function getMoviePoster(image_url) {
	return 'https://image.tmdb.org/t/p/w300' + image_url
}