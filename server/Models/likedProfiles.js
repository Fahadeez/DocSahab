const mongoose = require('mongoose');

const { Schema } = mongoose;

const likedProfilesSchema = Schema({
    
    id: String,

});

module.exports = likedProfilesSchema;