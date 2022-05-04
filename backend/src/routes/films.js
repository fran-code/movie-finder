const { findFilm, rateFilm, isFavorite, findFilmById } = require('../controllers/films.js')
const express = require('express')

const films = express.Router()

films.route('/find')
    .get(findFilm)

films.route('/findById')
    .get(findFilmById)

films.route('/rate')
    .post(rateFilm)

films.route('/isFavorite')
    .get(isFavorite)

module.exports = films