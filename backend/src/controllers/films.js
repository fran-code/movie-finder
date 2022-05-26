const https = require('https')
const { Films, checkExisting } = require('./../models/ratingModel')

const optionsHttps = {
    hostname: 'www.omdbapi.com',
    method: 'GET',
};

const findFilm = async (req, res) => {
    try {
        const httpsRequest = https.request({ ...optionsHttps, path: `/?apikey=f59735b3&type=movie&page=${req.query.page}&s=${encodeURIComponent(req.query.filmName)}` }, response => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                if (response.statusCode !== 200) {
                    res.status(500).json({ message: "Error!" })
                } else {
                    const parsedData = JSON.parse(data)
                    res.status(200).json({ message: parsedData })
                }
            });
        })

        httpsRequest.on("error", (err) => {
            res.status(500).json({ message: "Error!" })
        });

        httpsRequest.end()

    } catch (error) {
        console.log("error::", error)
        res.status(500).json({ message: "Error!" })
    }
}

const findFilmById = async (req, res) => {
    try {
        let httpsRequest = https.request({ ...optionsHttps, path: `/?apikey=f59735b3&i=${req.query.imdbID}` }, response => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                if (response.statusCode !== 200) {
                    res.status(500).json({ message: "Error!" })
                } else {
                    const parsedData = JSON.parse(data)
                    res.status(200).json({ message: parsedData })
                }
            });
        })

        httpsRequest.on("error", (err) => {
            res.status(500).json({ message: "Error!" })
        });

        httpsRequest.end()

    } catch (error) {
        console.log("error::", error)
        res.status(500).json({ message: "Error!" })
    }
}

const isFavorite = async (req, res) => {
    try {
        const { imdbID } = req.query
        const exists = await checkExisting({ imdbID })
        if (exists) {
            res.status(200).json({ message: exists.favorite })
        } else {
            res.status(200).json({ message: false })
        }
    } catch (error) {
        console.log("error::", error)
        res.status(500).json({ message: "Error!" })
    }
}

const rateFilm = async (req, res) => {
    try {
        const { imdbID } = req.body
        const exists = await checkExisting({ imdbID })
        if (exists) {
            await Films.findByIdAndUpdate(exists._id, { favorite: !exists.favorite });
            res.status(200).json({ message: !exists.favorite })
        } else {
            const newFilm = new Films({ imdbID, favorite: true });
            await newFilm.save();
            res.status(200).json({ message: true })
        }
    } catch (error) {
        console.log("error::", error)
        res.status(500).json({ message: "Error!" })
    }
}

module.exports = { findFilm, findFilmById, isFavorite, rateFilm }