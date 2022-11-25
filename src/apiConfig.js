export const baseUrl = "https://api.themoviedb.org/3";
export const apikey = "e73f257fc4704818fcdc0479ca01561d";
export const imgBaseURL = "https://image.tmdb.org/t/p";
export function posterImg(path, size = "w300") {
	return `${imgBaseURL}/${size}/${path}`;
}
