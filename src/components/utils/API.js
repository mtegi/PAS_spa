import axios from "axios";
const URL = 'http://localhost:8080/SpringMVC_war_exploded/rest';
const GET_ALL ='/get';
const GET ='/get/';
const DELETE = '/delete/';
const CREATE = '/create';
const UPDATE = '/update/';
const BOOKS = '/books';
const FILMS = '/films';
const COPIES ='/copies';
const FILM_COPIES = '/film-copies';

export const ApiHelper = {

    getBooks: async () => {
        let path = URL + BOOKS + GET_ALL;
        return axios.get(path);
    },

    getBook: async (id) => {
        let path = URL + BOOKS + GET + id;
        return axios.get(path);
    },

    updateBook: async (body, id) => {
        let path = URL + BOOKS + UPDATE + id;
        return axios.put(path, body);
    },

    getFilms: async () => {
        let path = URL + FILMS + GET_ALL;
        return axios.get(path);
    },
    getFilm: async (id) => {
        let path = URL + FILMS + GET + id;
        return axios.get(path);
    },

    updateFilm: async (body, id) => {
        let path = URL + FILMS + UPDATE + id;
        return axios.put(path, body);
    },

    addFilm: async (body) => {
        let path = URL + FILMS + CREATE;
        return axios.post(path, body);
    },

    getCopies: async () => {
        let path = URL + COPIES + GET_ALL;
        return axios.get(path);
    },

    getFilmCopies: async () => {
        let path = URL + FILM_COPIES + GET_ALL;
        return axios.get(path);
    },

    addBook: async (body) => {
        let path = URL + BOOKS + CREATE;
        return axios.post(path, body);
    },

    deleteBook: async (id) => {
        let path = URL + BOOKS + DELETE + id;
        return axios.delete(path);
    },

    deleteFilm: async (id) => {
        let path = URL + FILMS + DELETE + id;
        return axios.delete(path);
    },

    deleteFilmCopy: async (id) => {
        let path = URL + FILM_COPIES + DELETE + id;
        return axios.delete(path);
    },

    deleteCopy: async (id) => {
        let path = URL + COPIES + DELETE + id;
        return axios.delete(path);
    },

};
export default ApiHelper;