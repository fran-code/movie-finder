const mongoose = require('mongoose');

const filmsSchema = new mongoose.Schema({
    imdbID: {
        type: String, unique: true
    },
    favorite: {
        type: Boolean
    }
})

const Films = mongoose.model('Films', filmsSchema);

/**
 * Checks if param already exists
 * @param {param} param
 * @returns {(boolean|Object)} True if doc existing, false otherwise
 */
async function checkExisting(param) {
    const match = await Films.findOne(param);
    return match;
}

module.exports = { Films, checkExisting };
