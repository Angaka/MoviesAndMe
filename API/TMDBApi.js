const API_TOKEN = "863d189692081dd1daf38b7bf7512216"

export function getMoviesFromQuery (text) {
	const url = 'https://api.themoviedb.org/3/search/movie/?api_key=' + API_TOKEN + '&language=fr&query=' + text
	return fetch(url)
		.then((res) => res.json())
}

export function getMoviePoster(image_url) {
	return 'https://image.tmdb.org/t/p/w300' + image_url
}