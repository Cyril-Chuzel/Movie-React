import axios from 'axios';

const apiKey = '80cabb7ae257b58ac8286b0a867c2ade';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const moviesUrl = `${url}/discover/movie`;
const searchBox = `${url}/search/movie`;


// Set the language displayed, can be changed easily for adding a language changing button in a future update 
var UsedLanguage = "en_US" 


// In the FetchMovies function we will want to export all the data
// about the movies to use them in our .jsx file for that we will have
// to form the link to movie database, we will retrieve the data of the api key,
// the language in English, the number of page which is by default 1,
// then we will decide to choose the data of the movie we want to export such as the poster,
// the original language, the note of the movie, the title and the id of the movie

export const fetchMovies = async () => {
    try {
        const { data } = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: UsedLanguage,
                page: 1
            }
        })

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            rating: m['vote_average'],
            release_date: m['release_date'],
            vote_count: m['vote_count'],
            original_language: m['original_language']
        }))

        return modifiedData;
    } catch (error) { }
}

export const fetchMovieByGenre = async (genre_id) => {
    try {
        const { data } = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: UsedLanguage,
                page: 1,
                with_genres: genre_id
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}

export const fetchTopratedMovie = async () => {
    try {
        const { data } = await axios.get(topratedUrl, {
            params: {
                api_key: apiKey,
                language: UsedLanguage,
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) {

    }
}

export const fetchMovieDetail = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: UsedLanguage
            }
        });
        return data;
    } catch (error) { }
}

export const fetchMovieVideos = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey,
            }
        });
        return data['results'][0];
    } catch (error) { }
}

export const fetchSimilarMovie = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: UsedLanguage
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}

// fetchSearch is the function wich allow us to search movies with the research bar
// on the header. It take a text in input and search for matching movie titles, 
// and then return a list of datas corresponding of matching films.
export const fetchSearch = async (searchText) => {
    try {
        const { data } = await axios.get(searchBox, {
            params: {
                api_key: apiKey,
                language: UsedLanguage,
                page: 1,
                query: searchText
            }
        })
        return data.results;
    } catch (error) { }
}